# Digielves Tech Solutions — WordPress → Django + React migration

This replicates https://digielvestech.in/ (currently WordPress) on a
**Python/Django + React** stack, keeping the same pages, navigation, and copy.

```
digielvestech/
├── backend/     Django + Django REST Framework (replaces the WP admin/CMS)
└── frontend/    React (Vite) — replaces the WP theme/templates
```

## Why this split

- **Django admin** (`/admin/`) replaces the WordPress dashboard — your client edits
  services, projects, stats, about copy, and site settings there, no code changes needed.
- **Django REST Framework** exposes that content as JSON at `/api/...`.
- **React** consumes the API and renders the same pages WordPress had: Home, About Us,
  the 6 service pages (Website Designing, Website Development, E-Commerce, SEO,
  Digital Marketing, Web Portal), Our Works/Projects, and Contact Us (with a working
  form that stores leads in the DB and emails you).

## Run it locally

### 1. Backend (Django)

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # edit as needed
python manage.py migrate
python manage.py seed_content                       # loads the real site copy
python manage.py createsuperuser                    # to log in to /admin/
python manage.py runserver
```
API now runs at http://127.0.0.1:8000/api/, admin at http://127.0.0.1:8000/admin/.

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
Site runs at http://localhost:5173 and proxies `/api` calls to the Django server.

## What's already wired up

- All 6 service pages, each with its own platforms, process steps and feature list —
  editable per-service in `/admin/`.
- Home page stats counters (Satisfied Clients, Projects Done, etc.), animated on scroll.
- Contact form → `POST /api/contact/` → saved to `ContactMessage` (viewable in admin)
  and emailed via Django's `send_mail` (configure `EMAIL_*` vars in `.env`).
- Site-wide settings (logo, footer text, phone, address, social links) as a single
  editable row in `/admin/` instead of being hardcoded in templates.

## What you'll likely want to customize next

- **Images**: the original WP media (logos, icons, banners) weren't re-hosted here —
  upload them via `/admin/` against the `Service.icon`, `Service.banner_image`,
  `Project.thumbnail`, `SiteSettings.logo` fields (I can pull and wire the exact
  original image files too if you want a byte-for-byte visual match).
- **Projects**: only placeholder entries are seeded — add the real portfolio items
  from https://digielvestech.in/index.php/projects/ via `/admin/`.
- **Google Maps embed URL**: paste the original iframe `src` into
  `SiteSettings.google_maps_embed`.
- **Production deploy**: swap SQLite → Postgres in `settings.py`, set `DEBUG=False`,
  run `collectstatic`, and build the frontend with `npm run build` (serve the
  `frontend/dist` folder via Nginx/Whitenoise or a static host).

## Design notes

Visual styling (navy `#0b1a2f` + orange `#ff6a3d` accent, Sora/Inter type) is a
close, modern re-interpretation of the original — not a pixel-for-pixel CSS port,
since that wasn't extracted from the WP theme files. Say the word if you want me to
match the exact original palette/fonts more precisely from screenshots.
