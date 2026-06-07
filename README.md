# NOIR Studio Booking

A standalone bilingual portfolio case study for a premium barbershop and beauty studio. It demonstrates a complete service-booking workflow, date/time rules, validated forms, responsive UI, mock administration, and a replaceable Supabase data boundary.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS
- React Hook Form and Zod
- date-fns
- Supabase JS (optional)
- next-intl
- Vitest

## Features

- Editorial home page with services, team, reviews, and booking calls to action
- Six-step booking flow: service, master, date, time, customer details, confirmation
- Compatibility filtering between services and masters
- Different service durations
- Working-hours based slot generation at 30-minute intervals
- Past date/time and occupied interval exclusion
- Empty availability state
- Zod validation for customer name and Russian phone number
- Admin view with date/master filters and editable mock statuses
- Responsive layouts for desktop and mobile
- Russian and English interfaces with locale-aware routes

## RU/EN Localization

Russian is the default language. Opening `/` redirects to `/ru`.

- Russian routes: `/ru`, `/ru/booking`, `/ru/admin`
- English routes: `/en`, `/en/booking`, `/en/admin`
- The `RU / EN` switcher preserves the current page when the locale changes.
- All customer-facing navigation, content, forms, validation errors, statuses, filters, empty states, loading states, services, specialists, and mock customer names live in `messages/ru.json` and `messages/en.json`.
- Dates and prices use locale-aware formatting.

Locale routing is configured in `src/i18n/routing.ts`, request messages in `src/i18n/request.ts`, and middleware in `src/middleware.ts`.

## Booking Logic

`src/utils/date.ts` owns the availability rules. The generator:

1. Rejects dates before today.
2. Reads the selected master's schedule for the weekday.
3. Creates 30-minute candidate starts.
4. Ensures the selected service finishes before closing.
5. Removes candidate intervals that overlap active bookings.
6. Ignores cancelled bookings.
7. Removes starts earlier than the current time.

The UI consumes this pure function, making the logic easy to test and reusable with either mock or Supabase data.

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to the Russian locale.

Checks:

```bash
npm test
npm run lint
npm run build
```

## Supabase Setup

The app runs in demo/mock mode without environment variables. No secrets are committed. To prepare Supabase mode:

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Run the SQL below in Supabase SQL Editor.
5. Replace mock repository reads/writes with typed Supabase queries. `src/lib/supabase.ts` already exposes a guarded client.

```sql
create extension if not exists "pgcrypto";

create type booking_status as enum ('new', 'confirmed', 'cancelled');

create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  price_rub integer not null check (price_rub >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table masters (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  role text not null,
  experience text,
  bio text,
  image_url text,
  schedule jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table master_services (
  master_id uuid not null references masters(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  primary key (master_id, service_id)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id),
  master_id uuid not null references masters(id),
  starts_at timestamptz not null,
  customer_name text not null,
  customer_phone text not null,
  status booking_status not null default 'new',
  created_at timestamptz not null default now()
);

create index bookings_master_starts_at_idx on bookings(master_id, starts_at);
create index bookings_status_idx on bookings(status);
```

For production, enable Row Level Security. Public clients should only read active services and masters. Booking creation and admin status updates should be implemented through restricted policies or server-side actions; do not expose unrestricted update access through the anonymous key.

## Vercel Deployment

1. Push the repository to GitHub and import it into Vercel.
2. Keep mock mode by deploying without Supabase variables, or add both variables in Project Settings.
3. Use the default Next.js build command: `npm run build`.
4. Redeploy after changing environment variables.

Vercel detects Next.js automatically. The root route is handled by `next-intl` middleware and redirects to `/ru`.

No filesystem persistence is required. Mock admin changes intentionally reset on refresh.

## Skills Demonstrated

- App Router composition and server/client component boundaries
- Typed domain modeling and isolated business rules
- Date arithmetic and interval-overlap handling
- Multi-step transactional UX
- Accessible forms and schema validation
- Responsive editorial and operational interfaces
- Locale routing and complete RU/EN message dictionaries
- Mock-first architecture with a Supabase migration path
- Unit, build, and browser-level verification
