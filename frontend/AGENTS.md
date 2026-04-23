# AGENTS.md

## Mission

You are implementing the **frontend** for **Wayspend**, a hackathon project inspired by the provided Waystar / Wayspend design exports.

Your goal is to **one-shot a production-looking React frontend** that:
- uses the provided HTML designs as the visual source of truth,
- adapts them to the actual **Wayspend** hackathon product,
- is organized for quick backend integration,
- prioritizes **demo reliability, UX clarity, and accessibility**,
- avoids unnecessary complexity.

This is a **hackathon build**, so optimize for:
1. working end-to-end demo flow,
2. clear and polished UI,
3. clean structure for backend hookup,
4. accessibility and trust,
5. speed over perfection.

Do **not** rebuild the entire Waystar website. Reuse the visual language and component patterns, but implement only the app surfaces that matter for Wayspend.

---

## Project Context

Wayspend is a configurable, healthcare-focused payment platform that lets providers create secure, branded, reusable payment pages, and lets patients complete demo-safe payments quickly with clarity and confidence.

### Core stack
- Frontend: **React 19 + TypeScript + Vite**
- Backend: **Express 5 + TypeScript**
- Database: **MySQL 8**
- Payments: **Stripe test mode only**
- Auth: **Auth0**
- Backend DB access: **mysql2**
- Local development: **Docker + docker-compose**

### Backend status
Assume the backend and DB foundation already exist, including:
- Express server
- Dockerized MySQL
- schema direction for:
  - `admin_users` / `users`
  - `payment_pages`
  - `custom_fields`
  - `transactions`
  - `field_responses`

Frontend work must be structured so it can cleanly connect to backend APIs as soon as routes are ready.

---

## What the frontend MUST support

### Admin UX
Implement:
- Login / signup entry flow shell
- Dashboard
- Payment Pages list
- Payment Page Builder / Editor
- Live Preview panel
- Reporting page

### Payer UX
Implement:
- Public payment page
- Fast minimal payment form
- Trust panel / trust messaging
- Stripe Payment Element placeholder area / integration-ready section
- Success page
- Failure page
- Disabled page

### Product requirements the UI must support
- Page creation and editing
- Unique page slug
- Branding controls:
  - logo URL / logo area
  - brand color
  - page title
  - subtitle / description
  - header message
  - footer message
- Amount modes:
  - fixed
  - range
  - open
- Dynamic custom fields:
  - text
  - number
  - dropdown
  - date
  - checkbox
- GL code entry / display area
- Distribution tools:
  - copy public URL
  - iframe snippet
  - QR code area
- Reporting:
  - transaction table
  - summary cards
  - filters
  - breakdowns
- Demo-safe payment messaging
- Accessibility-first forms and interactions

---

## Important design instruction

The provided HTML exports and screenshots are **visual references**, not a literal product spec.

### Reuse directly
Use them for:
- palette
- typography hierarchy
- spacing rhythm
- sidebar/topbar layout
- cards
- stat blocks
- dashboard shell
- button styling
- payer payment card layout
- enterprise healthcare tone
- trust-first feel

### Do NOT waste time recreating
Do not build:
- full marketing site
- full claim manager product
- denial recovery workflows
- complete AI marketing site
- non-Wayspend enterprise sections

Only build the Wayspend screens needed for the hackathon demo.

---

## Design system and styling rules

### Visual style
Match the Waystar-inspired system:
- deep navy backgrounds
- cream page backgrounds
- white cards
- coral / orange accent
- subtle shadows
- rounded corners
- professional healthcare-enterprise feel
- clean, restrained UI
- calm and trustworthy tone

### Recommended palette
Use a shared theme token file with values close to:
- `navy-900: #0B1F3A`
- `navy-950: #071526`
- `cream-100: #F4ECDD`
- `white: #FFFFFF`
- `orange-600: #E8743C`
- `border-1: #E3D8BE`

### Typography
Use system-safe or accessible substitutes:
- Sans: `Inter, system-ui, sans-serif`
- Serif/display accent if needed: `Source Serif 4, Georgia, serif`

### Styling approach
Preferred:
- CSS modules, plain CSS, or Tailwind if already present and team agrees
- Reusable design tokens
- Reusable common components
- Consistent spacing and sizing

Avoid:
- giant one-file pages
- duplicated inline styling everywhere
- deeply nested hardcoded layout logic
- over-abstracting early

---

## Frontend architecture to implement

Use this directory structure under `frontend/src`:

```txt
src/
  api/
    authApi.ts
    pagesApi.ts
    paymentsApi.ts
    reportsApi.ts
  assets/
  components/
    admin/
      Sidebar.tsx
      Topbar.tsx
      PageHeader.tsx
      PaymentPageCard.tsx
      ActivityTable.tsx
      BuilderForm.tsx
      PreviewPanel.tsx
      DistributionPanel.tsx
      CustomFieldsEditor.tsx
      ReportFilters.tsx
    payment/
      BillSummaryCard.tsx
      PaymentOptionCard.tsx
      TrustPanel.tsx
      SecureFooter.tsx
      PaymentStatusBanner.tsx
    common/
      Button.tsx
      Card.tsx
      Input.tsx
      Select.tsx
      Textarea.tsx
      Checkbox.tsx
      Badge.tsx
      StatusPill.tsx
      StatCard.tsx
      SearchBar.tsx
      EmptyState.tsx
      LoadingState.tsx
      ErrorState.tsx
  layouts/
    AdminLayout.tsx
    PublicLayout.tsx
    AuthLayout.tsx
  pages/
    auth/
      LoginPage.tsx
      SignupPage.tsx
      VerifyEmailPage.tsx
    admin/
      DashboardPage.tsx
      PaymentPagesPage.tsx
      PaymentPageEditorPage.tsx
      ReportsPage.tsx
    public/
      PublicPaymentPage.tsx
      PaymentSuccessPage.tsx
      PaymentFailurePage.tsx
      PaymentDisabledPage.tsx
  routes/
    AppRoutes.tsx
    ProtectedRoute.tsx
    RoleRoute.tsx
  styles/
    tokens.css
    globals.css
    utilities.css
  types/
    auth.ts
    paymentPage.ts
    transaction.ts
    report.ts
  utils/
    formatters.ts
    constants.ts
    mockData.ts
    routeHelpers.ts
  App.tsx
  main.tsx
```

---

## Route map to implement

```txt
/
  -> redirect intelligently to /admin/dashboard or /login

/login
/signup
/verify-email

/admin/dashboard
/admin/payment-pages
/admin/payment-pages/new
/admin/payment-pages/:id/edit
/admin/reports

/pay/:slug
/pay/:slug/success
/pay/:slug/failure
/pay/:slug/disabled
```

Optional:
```txt
/preview/:slug
```

---

## Data contracts the frontend should expect

Design frontend types and API clients around these shapes.

### PaymentPage
```ts
type AmountMode = "fixed" | "range" | "open";

type CustomFieldType = "text" | "number" | "dropdown" | "date" | "checkbox";

type CustomField = {
  id: string;
  label: string;
  fieldType: CustomFieldType;
  required: boolean;
  placeholder?: string;
  helperText?: string;
  options?: string[];
  order: number;
};

type PaymentPage = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  brandColor: string;
  logoUrl?: string;
  headerMessage?: string;
  footerMessage?: string;
  amountMode: AmountMode;
  fixedAmount?: number;
  minAmount?: number;
  maxAmount?: number;
  glCodes?: string[];
  isActive: boolean;
  customFields: CustomField[];
  confirmationTemplate?: string;
};
```

### Transaction
```ts
type TransactionStatus = "success" | "failed" | "pending";

type Transaction = {
  id: string;
  pageId: string;
  pageTitle?: string;
  payerName?: string;
  payerEmail?: string;
  amount: number;
  paymentMethod: "card" | "wallet" | "ach";
  status: TransactionStatus;
  glCode?: string;
  createdAt: string;
};
```

### Auth user
```ts
type AppUserRole = "admin" | "payer";

type AppUser = {
  id: string;
  email: string;
  name?: string;
  role: AppUserRole;
  emailVerified?: boolean;
};
```

---

## API integration expectations

Build pages so they work immediately with mock data, but keep all data access behind small API modules.

### Expected API modules
- `authApi.ts`
- `pagesApi.ts`
- `paymentsApi.ts`
- `reportsApi.ts`

### Expected backend endpoints
Assume something close to:
- `POST /api/auth/sync`
- `GET /api/payment-pages`
- `POST /api/payment-pages`
- `GET /api/payment-pages/:id`
- `PUT /api/payment-pages/:id`
- `PATCH /api/payment-pages/:id/status`
- `GET /api/public/payment-pages/:slug`
- `POST /api/payments/intent`
- `POST /api/payments/complete`
- `GET /api/reports/transactions`
- `GET /api/reports/summary`

Important:
- keep API access centralized,
- use typed response shapes,
- make it easy to swap mocks for real requests.

---

## Required implementation order

Follow this order exactly unless blocked.

### Phase 1 — foundation
1. Set up global design tokens and base styling
2. Upgrade app routing
3. Build `AdminLayout`
4. Build `Sidebar`
5. Build `Topbar`
6. Build shared reusable components:
   - Button
   - Card
   - StatCard
   - StatusPill
   - SearchBar
   - Empty / Loading / Error states

### Phase 2 — admin dashboard
Implement:
- `DashboardPage`
- headline/greeting section
- 4 summary stat cards
- recent transaction/payment activity list
- right-side insight / AI-style card

Adapt labels to Wayspend, not claims:
- total collected
- average payment amount
- successful payments
- failed / pending / disabled counts

### Phase 3 — payment pages list
Implement:
- page title / subtitle
- slug
- amount mode
- status
- last updated if mockable
- actions:
  - edit
  - preview
  - copy link
- “Create New Page” CTA

Use list/table cards in the Waystar enterprise style.

### Phase 4 — payment page editor / builder
This is the highest-priority custom screen.

Use a 2-column layout:
- left: editor form
- right: live preview panel

#### Builder form sections
1. General
   - title
   - slug
   - subtitle
   - description
2. Branding
   - logo URL
   - brand color
   - header message
   - footer message
3. Amount configuration
   - fixed
   - range
   - open
4. Custom fields editor
5. GL codes
6. Distribution panel
   - URL display/copy
   - iframe snippet
   - QR placeholder / area
7. Active / disabled toggle

#### Live preview panel
Render a realistic public payer page preview using current form state.

### Phase 5 — reporting page
Implement:
- summary stat cards
- filters:
  - date range
  - payment page
  - status
  - method
- transaction table
- GL code breakdown
- payment method breakdown
- export button placeholder

Use the analytics/reporting design style, but adapt all content to payment reporting.

### Phase 6 — payer flow
Implement the public payment flow using the provided payment screenshot as the main visual anchor.

#### Public payment page must include
- provider identity
- statement or payment title
- amount due / amount entry
- line items or summary block when relevant
- amount mode behavior
- custom payer fields
- payment option selector
- Stripe Payment Element area / placeholder
- trust panel
- “secure payment” footer
- demo-safe notice
- continue / submit CTA

Payer flow must be extremely clean and minimal.

### Phase 7 — payer state pages
Implement:
- success page
- failure page
- disabled page

#### Success page
Should feel receipt-like:
- confirmation headline
- transaction ID placeholder
- amount paid
- provider name
- date/time
- next-step note
- “return” / “done” CTA

#### Failure page
Must clearly explain:
- payment failed
- try again
- contact provider if needed

#### Disabled page
Must clearly explain:
- payment page unavailable
- temporarily disabled or expired
- contact provider

---

## Accessibility requirements

All public-facing payment pages must be accessibility-conscious from the start.

### Enforce
- semantic headings
- proper labels for all inputs
- visible focus states
- keyboard navigability
- aria descriptions for errors/help text
- adequate contrast
- no meaning conveyed by color alone
- alt text for logos/images
- button hit areas large enough
- reasonable tab order

### Codex instruction
Do not leave accessibility as a future TODO. Build it in as components are created.

---

## Auth0 expectations

Do not fully wire Auth0 unless the frontend config is available, but structure for it.

### Required auth readiness
- auth page shells
- user session context placeholder
- role-based route guard pattern
- verified/unverified state handling UI
- login/signup/verify-email pages

### Important
If Auth0 cannot be fully completed immediately, build:
- route structure
- placeholder session provider shape
- mock user role state
- clear TODO boundaries for real SDK hookup

Do not let Auth0 block the rest of the UI build.

---

## Stripe expectations

Do not store card data in frontend state.

### Payment integration readiness
- create a dedicated payment section component
- keep it ready for Stripe Payment Element insertion
- use a placeholder wrapper if live integration is not yet wired
- isolate Stripe-specific logic from the rest of the page

Do not overbuild payment orchestration yet. Prioritize a clean UI seam.

---

## Backend readiness rules

The frontend must be backend-ready even if endpoints are unfinished.

### Therefore
- create API modules now
- use typed mocks
- isolate fetch logic
- avoid hardcoding data directly inside pages
- keep mock data in `utils/mockData.ts`
- pages should be able to switch from mock to real data with minimal refactor

### Use environment variables for
- API base URL
- Auth0 domain/client data placeholders
- Stripe publishable key placeholder

---

## Non-goals

Do not spend time on:
- full marketing site implementation
- recreating all enterprise Waystar pages
- broad animations
- overcomplicated state management
- premature optimization
- advanced charting if simple placeholders suffice
- building a design system package
- perfect dark mode
- stretch-goal features unless core flow is done

---

## Preferred libraries

Use only if needed and if already compatible with the repo:
- `react-router-dom`
- `lucide-react`
- `@auth0/auth0-react` (only if wiring auth now)
- `@stripe/react-stripe-js`
- `@stripe/stripe-js`
- `react-qr-code` or `qrcode`
- lightweight utility libs only

Avoid large, unnecessary UI frameworks unless already chosen by the team.

---

## Code quality rules

- Use TypeScript everywhere
- Prefer small reusable components
- Keep page components readable
- Keep prop names clear
- Use `import type` for type-only imports
- Avoid inline mock logic explosion inside pages
- Avoid giant files when obvious component extraction exists
- Favor explicit and boring code over clever code
- Add comments only where they clarify integration seams or complex intent

---

## Deliverables Codex should produce

1. Updated frontend structure
2. Shared styling tokens / theme system
3. Admin layout matching the Waystar-inspired design
4. Dashboard page
5. Payment Pages list page
6. Payment Page editor/builder page
7. Reporting page
8. Public payment page
9. Success / failure / disabled pages
10. API client stubs / typed fetch layer
11. Mock data layer
12. Route protection scaffolding
13. Integration-ready seams for Auth0 and Stripe

---

## Final success criteria

The frontend is considered successful when:
- it visually matches the provided design language,
- it implements the actual Wayspend product surfaces,
- it supports the hackathon’s required flows,
- it is easy to connect to backend routes,
- it is demo-safe and polished,
- the payer experience feels trustworthy and clean,
- the admin flow can credibly support the demo:
  1. login,
  2. create/edit page,
  3. distribute link,
  4. open public page,
  5. submit payment,
  6. view transaction in reports.

If tradeoffs are required, prioritize:
1. payer flow,
2. page builder,
3. reporting,
4. dashboard polish,
5. everything else.
