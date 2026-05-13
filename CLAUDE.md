# RGC Website — Deploy Agent Memory

This file is the persistent memory for deploying the RGC website. It is automatically updated whenever a deploy fails. Read this before making any changes that will be deployed.

---

## Stack

- **Framework:** Next.js 14 App Router, TypeScript
- **Styling:** Inline styles throughout (no Tailwind for layout)
- **Hosting:** Render — auto-deploys on push to `main` branch of `github.com/bazuoma/rgc-website`
- **Build command:** `npm install && npm run build && npm start`
- **Node version:** 20

---

## Deployment Rules

Before pushing any code, verify these or the build will fail:

### 1. ESLint is enforced at build time
Render runs `next build` which includes linting. ESLint errors = build failure.

**Known rules that bite:**
- `@typescript-eslint/no-unused-vars` — Never declare a catch variable you don't use. Use `catch { }` not `catch (e) { }` or `catch (_) { }` if you're not using the error.
- Any `console.log` left in production code may trigger warnings.

### 2. `useSearchParams()` requires a Suspense boundary
Any page or component using `useSearchParams()` from `next/navigation` must be wrapped in `<Suspense>`. Otherwise Next.js fails during static prerendering.

**Pattern to follow:**
```tsx
// ✅ Correct
function InnerComponent() {
  const searchParams = useSearchParams();
  // ...
}

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <InnerComponent />
    </Suspense>
  );
}
```

### 3. File name casing is case-sensitive on Linux (Render)
macOS is case-insensitive — a broken import works locally but fails on Render.
- Always use `git mv` to rename files, never rename in Finder/editor
- Import paths must exactly match the file name case
- Example that burned us: `RGCLogo.tsx` imported as `RgcLogo` — worked on Mac, crashed on Render

### 4. SVG/image imports in edge runtime
`app/icon.tsx` and `app/opengraph-image.tsx` use `export const runtime = 'edge'`. These cannot import Node.js-only modules or local SVG files directly. Use `ImageResponse` with JSX only.

---

## Known Deploy Failures & Fixes

| Date | Commit | Error | Fix |
|------|--------|-------|-----|
| May 12, 2026 | d1f6ce2 | `Error occurred prerendering page "/contact"` — useSearchParams without Suspense | Wrapped ContactForm in `<Suspense>` in contact/page.tsx |
| May 12, 2026 | bb2d439 | `'_' is defined but never used` in contact/page.tsx and signup/page.tsx | Changed `catch (_) {` to `catch {` in both files |

---

## Environment Variables (Render)

These must be set in Render → Service → Environment before deploying features that need them:

| Variable | Used for |
|----------|----------|
| `MAILCHIMP_API_KEY` | Mailchimp subscriber API |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp list ID |
| `MAILCHIMP_SERVER` | Mailchimp server prefix (e.g. `us14`) |

---

## How to Update This File

When Brandon sends a screenshot of a failed deploy:
1. Identify the error from the Render logs
2. Fix the code
3. Add a new row to the **Known Deploy Failures & Fixes** table above
4. Commit this file alongside the fix
