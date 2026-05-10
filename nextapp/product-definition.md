# Product Definition (MVP Creator)

Define what you're building, who it's for, and user journeys before writing React code.

## Step 1: Define What We're Building

```
> I have an idea for [describe your app]
> Help me plan a SaaS for [target audience]
> Research competitors for a [type] system
```

**Generates:** Research Report (competitor analysis, market overview, feature comparison)

## Step 2: Define Who We're Building For

```
> Create a business plan for my React app
> Define user personas for [app type]
> What are the success metrics for this MVP?
```

**Generates:** MVP Business Plan (vision, features, user flows, success metrics)

## Step 3: Define User Journeys

```
> Shape a spec for the [feature name] feature
> Create user stories for [user type]
> Map the user journey from signup to [goal]
```

**Generates:** User flows, feature specs, acceptance criteria

## Step 4: Technical Implementation (Next.js + React)

```
> Generate technical guide for the MVP
> Create Next.js project structure based on specs
> Set up Claude Code with specs for this project
```

**Generates:** Technical Guide (architecture, stack, components, data models) + Claude Setup (CLAUDE.md)

## Deliverables Checklist

- [ ] Research Report (market + competitors)
- [ ] MVP Business Plan (vision + features + metrics)
- [ ] Brand Guide (logo + colors + typography)
- [ ] User Personas (who is it for?)
- [ ] User Journeys (step-by-step flows)
- [ ] Technical Guide (architecture + stack)
- [ ] Feature Specs (detailed requirements)
- [ ] Claude Code Setup (CLAUDE.md generated)

## Example: Building a Booking System

```
> I have an idea for a booking system for freelancers
> Who are the main users? Define 2 personas (freelancer, client)
> Map the journey: freelancer creates profile → client books → payment
> Generate the MVP business plan
> Create technical specs for the booking feature
> Set up Claude Code with all specs for Next.js project
```

## Workflow Integration (React/Next.js)

```
Idea → MVP Creator (Research + Business Plan + User Journeys)
                ↓
    /flow full-audit (Architecture review with 17 auditors)
                ↓
    Next.js App (create-next-app --tailwind --typescript)
                ↓
    Claude Code + vibe-coding-plugin (Build with 77 skills)
                ↓
    /harden (Security + performance + accessibility)
                ↓
    /flow full-audit (Final validation before deploy)
```

## React-Specific Technical Decisions

When generating the Technical Guide, specify:

```
> Generate technical guide for Next.js 15 + React 19 app
> Use Tailwind CSS for styling
> Use Server Components by default
> Use Server Actions for mutations
> Use Zod for validation
> Use TypeScript strict mode
```

## Component Planning

```
> Create component hierarchy for the booking feature
> Define props interfaces for UserCard, BookingForm, CalendarView
> Plan state management strategy (Zustand vs Context)
> Map which components need to be Client vs Server Components
```