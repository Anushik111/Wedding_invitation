# Harutyun & Mane — Wedding Invitation

A responsive React + Vite wedding invitation website ready for Vercel.

## Run locally
1. Install Node.js (LTS).
2. In this folder run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL printed by Vite.

## Deploy to Vercel
1. Upload this folder to a GitHub repository.
2. In Vercel choose **Add New → Project** and import the repository.
3. Vercel should detect Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Press **Deploy**.

## Customize
Open `src/App.jsx` and edit the `WEDDING` object:
- `groom`, `bride`: couple names
- `dateLabel`: date shown on the invitation
- `dateISO`: countdown target date/time, ISO format
- `heroImage`: large cover image URL
- `musicUrl`: direct audio URL. For Dropbox use a direct link ending in `?raw=1`.
- `locations`: venue names, times, and map links

Replace the three `galleryImages` URLs in `src/App.jsx` with your own photo URLs. For best results, use publicly accessible image links or add image files to `public/` and refer to them as `/your-photo.jpg`.

The bride's home map link is a placeholder (`https://maps.google.com/?q=Armenia`) and should be replaced with the exact address/link.
