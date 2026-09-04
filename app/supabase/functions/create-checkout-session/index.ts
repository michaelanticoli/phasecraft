// Creates a Stripe Checkout Session for the caller and returns its hosted URL.
// Deploy: supabase functions deploy create-checkout-session
// Secrets required (supabase secrets set ...): STRIPE_SECRET_KEY,
// STRIPE_PRICE_ONCE, STRIPE_PRICE_INSTALLMENTS, SITE_URL

import Stripe from 'npm:stripe@17';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-11-20.acacia',
});

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const PRICE_BY_PLAN: Record<string, string> = {
  once: Deno.env.get('STRIPE_PRICE_ONCE')!,
  installments: Deno.env.get('STRIPE_PRICE_INSTALLMENTS')!,
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { plan } = await req.json();
    const priceId = PRICE_BY_PLAN[plan];
    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: enrollment } = await supabaseAdmin
      .from('enrollments')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    let customerId = enrollment?.stripe_customer_id ?? undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    const siteUrl = Deno.env.get('SITE_URL') ?? 'http://localhost:5173';

    const isInstallments = plan === 'installments';
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: user.id,
      mode: isInstallments ? 'subscription' : 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      // 3-payment plan: bill monthly, then stop automatically after ~3 cycles.
      // Access is granted on the first successful payment (see stripe-webhook)
      // and is never revoked when this subscription later ends.
      ...(isInstallments
        ? { subscription_data: { cancel_at: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60 } }
        : {}),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
    });

    await supabaseAdmin
      .from('enrollments')
      .update({ plan, stripe_customer_id: customerId, stripe_checkout_session_id: session.id })
      .eq('user_id', user.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
