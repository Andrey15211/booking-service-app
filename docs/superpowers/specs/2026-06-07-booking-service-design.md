# NOIR Studio Booking Service Design

## Product

Standalone portfolio case study for a premium Russian barbershop and beauty studio. The product combines an editorial marketing site, a six-step booking flow, deterministic slot availability, validated customer details, and a mock admin workspace.

## Visual Direction

- Brand: NOIR Studio
- Palette: near-black, warm ivory, muted gold, restrained semantic colors
- Typography: elegant serif display face paired with a neutral sans-serif UI face
- Photography: large monochrome or warm editorial salon imagery
- Layout: open editorial sections on the home page, focused soft-panel booking UI, compact operational admin view
- Responsive behavior: single-column transactional flow on mobile; no horizontal dependence

## Routes

- `/`: hero, services, masters, reviews, booking CTA
- `/booking`: six-step booking wizard
- `/admin`: booking list, date/master filters, editable mock statuses

## Architecture

- `src/data`: realistic seed data and a mock booking repository
- `src/types`: shared domain models
- `src/utils/date.ts`: business hours, overlap detection, past-time exclusion, and slot generation
- `src/lib/supabase.ts`: optional browser client creation guarded by environment variables
- `src/components/booking`: booking state and step components
- `src/components/admin`: filters and booking management UI

The UI consumes typed domain data and does not depend directly on Supabase. Mock mode is the default. Supabase can replace repository operations without changing booking components.

## Booking Rules

- Services have distinct durations and prices.
- Masters expose supported service IDs and weekly schedules.
- Dates before today cannot be selected.
- Slots are generated at 30-minute intervals within the selected master's schedule.
- A slot is unavailable if its service interval overlaps an active existing booking.
- A slot is unavailable if its start time is in the past.
- A clear empty state is shown when no valid slots remain.
- Customer name and Russian phone are validated with Zod through React Hook Form.

## Admin Rules

- Seed bookings are shown in a responsive list.
- Entries can be filtered by calendar date and master.
- Status can be changed among `new`, `confirmed`, and `cancelled` in local mock state.
- Cancelled bookings do not block slot availability.

## Verification

- Unit tests cover overlap, duration, past exclusion, and unavailable slots.
- `npm run lint`, `npm test`, and `npm run build` must pass.
- After build passes, CloakBrowser checks `/`, `/booking`, and `/admin` at desktop and mobile dimensions.

