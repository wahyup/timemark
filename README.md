# WP.EXE GEOCAM

Generator overlay geotag untuk foto (UI gaya iPhone). Dibangun dengan Vite + React + Tailwind CSS v3.

## Jalankan lokal

    npm install
    npm run dev

## Deploy ke Cloudflare Pages

### Cara 1 — Git (disarankan)
1. Push folder ini ke repo GitHub/GitLab.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Pengaturan build:
   - Framework preset: **Vite** (atau None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable (opsional): `NODE_VERSION` = `20`
4. Save and Deploy.

### Cara 2 — Direct upload lewat Wrangler
    npm install
    npm run build
    npx wrangler login
    npx wrangler pages deploy dist --project-name wp-exe-geocam

## Catatan
- Fitur GPS dan kamera butuh HTTPS (otomatis tersedia di *.pages.dev).
- Thumbnail peta default ada di `public/peta-default.jpg` (placeholder). Ganti dengan gambar Anda sendiri dengan nama yang sama.
- Setting tersimpan di localStorage browser masing-masing perangkat.
- Nama alamat dari GPS diambil dari Nominatim (OpenStreetMap), yang punya batas pemakaian wajar.
