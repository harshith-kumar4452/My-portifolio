# Harshith Kumar — Portfolio

Next.js (App Router) + React + TypeScript + Tailwind CSS v4 + Motion, deployed on Vercel from the `Frontend/` folder.

```bash
cd Frontend
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
```

- **Site settings** (email, phone, form endpoint): `Frontend/src/lib/site.ts`
- **Content** (projects, skills, education, achievements): `Frontend/src/lib/data.ts`
- **Pages**: `Frontend/src/app/*/page.tsx` (each exports its own SEO `metadata`)
- **Motion layer** (custom cursor, scroll thread, tilt, magnetic buttons): `Frontend/src/components/Effects.tsx`
- **Design system CSS**: `Frontend/src/app/legacy.css`, with Tailwind utilities layered on top in `globals.css`

Vercel: set the project **Root Directory** to `Frontend` (Framework Preset: Next.js).
