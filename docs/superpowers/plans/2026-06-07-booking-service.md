# NOIR Studio Booking Service Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone premium service-booking case study with a marketing home page, six-step booking flow, slot rules, validation, mock admin operations, and Supabase-ready boundaries.

**Architecture:** Next.js App Router renders public and admin routes. Typed seed data feeds client-side transactional components, while pure date utilities own availability rules and a guarded Supabase factory preserves an optional backend path.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, React Hook Form, Zod, date-fns, Supabase JS, Vitest

---

### Task 1: Scaffold and design system

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] Add the Next.js toolchain and scripts.
- [ ] Define fonts, metadata, palette, spacing, buttons, cards, and responsive primitives.
- [ ] Run `npm install`.

### Task 2: Domain data and slot logic

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/services.ts`
- Create: `src/data/masters.ts`
- Create: `src/data/bookings.ts`
- Create: `src/utils/date.ts`
- Create: `src/utils/date.test.ts`
- Create: `src/lib/supabase.ts`

- [ ] Define stable service, master, booking, and status contracts.
- [ ] Add realistic Russian seed data.
- [ ] Test overlap detection, service duration, past filtering, cancellation handling, and empty availability.
- [ ] Implement slot generation until all tests pass.
- [ ] Add an environment-guarded Supabase browser client.

### Task 3: Home route

**Files:**
- Create: `src/components/site/Header.tsx`
- Create: `src/components/site/Footer.tsx`
- Create: `src/app/page.tsx`

- [ ] Build an editorial hero with direct booking action.
- [ ] Render service, master, review, and final CTA sections.
- [ ] Make navigation and media responsive and accessible.

### Task 4: Booking wizard

**Files:**
- Create: `src/components/booking/BookingFlow.tsx`
- Create: `src/components/booking/BookingProgress.tsx`
- Create: `src/components/booking/CustomerForm.tsx`
- Create: `src/app/booking/page.tsx`

- [ ] Implement service and compatible-master selection.
- [ ] Implement date and generated-slot selection.
- [ ] Validate name and Russian phone with React Hook Form and Zod.
- [ ] Show a complete confirmation summary and restart action.

### Task 5: Admin route

**Files:**
- Create: `src/components/admin/AdminBookings.tsx`
- Create: `src/app/admin/page.tsx`

- [ ] Add date and master filters with reset behavior.
- [ ] Render responsive booking records.
- [ ] Allow status updates in local mock state.

### Task 6: Documentation and verification

**Files:**
- Create: `.env.example`
- Create: `.gitignore`
- Create: `README.md`

- [ ] Document goal, stack, rules, local setup, Supabase SQL, deployment, and demonstrated skills.
- [ ] Run `npm test`, `npm run lint`, and `npm run build`.
- [ ] Start the dev server and inspect desktop and mobile views through CloakBrowser.
- [ ] Fix material layout, readability, form, and responsive defects, then rebuild.

