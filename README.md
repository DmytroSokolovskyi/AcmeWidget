# Acme Widget Store - Basket

Frontend implementation of a shopping basket with pricing rules, discounts,
and tiered delivery. Built using
React, TypeScript, Vite, Tailwind v4, and Vitest.

All money is stored and calculated in cents to avoid floating-point rounding
issues.

## Overview

I kept the structure flat to make review easier:

- src/core — all business logic (Basket, pricing rules, delivery rules)
- src/hooks — useBasket as adapter between React state and core logic
- src/components — UI only (catalog + basket summary), styled with Tailwind v4

## Trade-offs & Decisions

- Domain logic is independent from React, so it can be tested and changed
  safely.
- For this scope I skipped aliases and heavier architecture (FSD) to avoid
  extra setup.
- Promo and delivery rules are in pricingRules.ts, so new campaigns can be
  added without rewriting basket internals.

## Commands

```bash
npm install
npm run dev
npm run test
npm run lint
npm run build

## Next steps

- add quantity controls (+ / - / remove)
- improve empty/loading UI states
