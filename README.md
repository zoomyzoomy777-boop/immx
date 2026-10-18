# zoomyyz

Portfolio site for Watthanatham Sabkerd: a single static `index.html` with no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Languages (TH / EN / JP)

The language menu in the nav comes from `i18n.js`. To translate an element, give it `data-i18n="key"` (or `data-i18n-attr="alt:key"` for attributes) and add the key with `en`, `th` and `ja` text to the `DICT` in `i18n.js`. The choice is remembered per browser, and `?lang=th|en|ja` in the URL picks one directly.

## Deploy (GitHub Pages)

Every push to `main` deploys through `.github/workflows/deploy.yml`.

One-time setup: in the GitHub repo, open **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.

The site will be live at `https://<username>.github.io/<repo-name>/`.
