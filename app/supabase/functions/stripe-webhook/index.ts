// Stripe webhook receiver — source of truth for marking an enrollment paid.
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
// (--no-verify-jwt because Stripe calls this directly, not through a logged-in
// user's session; the Stripe-Signature check below is what authenticates it.)
//
// Register in the Stripe dashboard: Developers -> Webhooks -> Add endpoint
//   URL: https://<project-ref>.supabase.co/functions/v1/stripe-webhook
//   Events: checkout.session.completed
// Then: supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...

import Stripe from 'npm:stripe@17';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-11-20.acacia',
});
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();

  if (!signature) {
    return new Response('Missing Stripe-Signature header', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    if (userId) {
      const { error } = await supabaseAdmin
        .from('enrollments')
        .update({
          status: 'active',
          enrolled_at: new Date().toISOString(),
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
        })
        .eq('user_id', userId);

      if (error) console.error('Failed to mark enrollment active', error);
    } else {
      console.error('checkout.session.completed with no client_reference_id', session.id);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
