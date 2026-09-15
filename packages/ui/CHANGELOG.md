# @zuwy/frontend-engineering-system-ui

## 0.1.0

### Minor Changes

- aa9238f: - Initial public release of the React UI component library.
  - Ship ESM bundle (`dist/index.js`), type declarations (`dist/index.d.ts`) and a standalone stylesheet (`dist/styles.css`).

  ### Added
  - `Button` — variants `primary` / `secondary` / `danger` / `ghost`, sizes `sm` / `md` / `lg`, defaults to `type="button"`.
  - `Badge` — variants `neutral` / `success` / `warning` / `danger` / `brand`.
  - `Card` — optional `title` / `description` header and `footer` slot.
  - `PageTitle` — `title` with optional `subtitle`.
  - `getButtonClassName` — helper to compose button class names, plus `ButtonVariant` / `ButtonSize` types.

  ### Notes
  - Requires `react` and `react-dom` `^19.2.7` as peer dependencies.
  - Import the stylesheet once in your app entry: `import "@zuwy/frontend-engineering-system-ui/styles.css"`.
  - Props are passed through to the underlying DOM element, so native attributes and `className` merging work as expected.

  [0.1.0]: https://www.npmjs.com/package/@zuwy/frontend-engineering-system-ui/v/0.1.0
