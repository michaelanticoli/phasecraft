// Hand-written to match supabase/migrations/0001_init.sql.
// If you change the schema, regenerate with the Supabase CLI instead:
//   supabase gen types typescript --project-id <ref> > src/lib/database.types.ts

type Relationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type Table<Row, Insert, Update, Relationships extends Relationship[] = []> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: Relationships;
};

export interface Database {
  public: {
    Tables: {
      profiles: Table<
        { id: string; display_name: string | null; timezone: string | null; created_at: string },
        { id: string; display_name?: string | null; timezone?: string | null },
        { display_name?: string | null; timezone?: string | null }
      >;
      // Client never writes to enrollments directly (see supabase/functions) — Insert/Update
      // shapes exist only to satisfy the generic constraint and are never actually used.
      enrollments: Table<
        {
          user_id: string;
          status: 'pending' | 'active' | 'canceled';
          plan: 'once' | 'installments' | null;
          stripe_customer_id: string | null;
          stripe_checkout_session_id: string | null;
          enrolled_at: string | null;
        },
        { user_id: string },
        Record<string, never>
      >;
      lesson_progress: Table<
        { user_id: string; lesson_key: string; completed_at: string },
        { user_id: string; lesson_key: string },
        Record<string, never>
      >;
      workbook_responses: Table<
        { user_id: string; exercise_key: string; responses: Record<string, string>; completed: boolean; updated_at: string },
        { user_id: string; exercise_key: string; responses?: Record<string, string>; completed?: boolean; updated_at?: string },
        { responses?: Record<string, string>; completed?: boolean; updated_at?: string }
      >;
      community_posts: Table<
        { id: string; user_id: string; category: string; title: string; body: string; created_at: string },
        { user_id: string; category: string; title: string; body: string },
        Record<string, never>,
        [
          {
            foreignKeyName: 'community_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ]
      >;
      community_resonances: Table<
        { post_id: string; user_id: string; created_at: string },
        { post_id: string; user_id: string },
        Record<string, never>
      >;
      notification_preferences: Table<
        {
          user_id: string;
          daily_directive: boolean;
          phase_transition: boolean;
          voc_reminders: boolean;
          community_digest: boolean;
        },
        { user_id: string },
        {
          daily_directive?: boolean;
          phase_transition?: boolean;
          voc_reminders?: boolean;
          community_digest?: boolean;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
