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

## Contact form → MongoDB

The contact form posts to `POST /api/contact`, which validates input (honeypot + per-IP rate limit) and saves it to MongoDB (`contact_messages` collection).

1. Create a free MongoDB Atlas cluster and a database user; allow network access (`0.0.0.0/0` for Vercel).
2. Local: copy `Frontend/.env.example` to `Frontend/.env.local` and fill in `MONGODB_URI` (and optionally `MONGODB_DB`, default `portfolio`).
3. Vercel: add the same variables under Project → Settings → Environment Variables, then redeploy.

Never commit real credentials; `.env*` files are gitignored except `.env.example`.
