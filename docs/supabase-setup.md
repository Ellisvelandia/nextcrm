# Supabase Setup Guide

This guide covers the step-by-step process for setting up Supabase for the Zafiro CRM system, including database schema, authentication, and role-based access control (RBAC).

## Prerequisites

1. A Supabase account (free tier is sufficient for development)
2. Basic knowledge of SQL and PostgreSQL
3. The Supabase CLI (optional, but recommended)

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Create a new project with a meaningful name (e.g., "zafiro-crm")
3. Note your project URL and anon key (found in Project Settings > API)
4. Add these values to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 2: Set Up Authentication

1. Navigate to the Authentication tab in your Supabase dashboard
2. Configure sign-in methods:
   - Enable Email/Password
   - Set up OAuth providers if needed (Google, GitHub, etc.)
3. Configure email templates for verification emails
4. Under **Auth Settings**:
   - Set site URL to your application URL
   - Configure redirect URLs
   - Enable email confirmations

## Step 3: Apply Database Schema

### Option 1: Using the SQL Editor

1. Navigate to the SQL Editor in your Supabase dashboard
2. Copy the contents of the `lib/supabase-schema.sql` file
3. Paste into the SQL Editor and run the queries

### Option 2: Using Supabase CLI (Recommended for production)

1. Install the CLI if you haven't: `npm install -g supabase`
2. Initialize Supabase in your project: `supabase init`
3. Set up local development: `supabase start`
4. Create a migration file: `supabase migration new init-schema`
5. Copy the schema into the migration file
6. Apply migrations: `supabase db push`

## Step 4: Verify Database Schema

After applying the schema, check that all tables were created successfully:

1. Navigate to the Table Editor in your Supabase dashboard
2. Confirm the following tables exist:
   - `employee_roles`
   - `user_profiles`
   - `clients`
   - `products`
   - `vendors`
   - `transactions`
   - `product_movements`
   - `audit_log`

## Step 5: Create Initial Admin User

1. Create a user through the Authentication > Users section in Supabase
2. Get the Admin role ID from the `employee_roles` table
3. Run the following SQL to manually set the first user as an admin:

```sql
UPDATE user_profiles 
SET role_id = (SELECT id FROM employee_roles WHERE name = 'Admin')
WHERE id = 'your-user-id';
```

## Step 6: Set Up RLS (Row Level Security)

All tables should have RLS policies applied automatically by the schema. Verify this in your Supabase dashboard:

1. Go to Database > Tables
2. Click on each table
3. Check that RLS is enabled
4. Verify that the appropriate policies exist

## Step 7: Test Authentication and RBAC

1. Start your Next.js application
2. Navigate to the login page
3. Sign in with your admin user
4. Verify that you can access all protected routes
5. Create a test user with a different role (e.g., Sales)
6. Verify that the test user has appropriate access restrictions

## Troubleshooting

### Common Issues

1. **Missing tables or columns**: Run the SQL schema again, making sure all statements execute successfully.

2. **RLS blocking access**: Temporarily disable RLS for testing, then re-enable and fix policies.

3. **Authentication issues**: Check that environment variables are correctly set.

4. **Permission errors**: Verify that default roles are inserted correctly in the `employee_roles` table.

### Database Resets

If you need to reset the database during development:

```sql
-- WARNING: This will delete all data!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

Then re-apply the schema from `lib/supabase-schema.sql`.

## Production Considerations

Before going to production, consider:

1. Set up database backups
2. Configure rate limiting on authentication endpoints
3. Review and possibly customize email templates
4. Test RLS policies extensively with multiple user roles
5. Set up audit logging triggers for sensitive operations
6. Configure proper CORS settings in Supabase

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security) 