# zoomyyz

Portfolio site for Watthanatham Sabkerd: a single static `index.html` with no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy (GitHub Pages)

Every push to `main` deploys through `.github/workflows/deploy.yml`.

One-time setup: in the GitHub repo, open **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.

The site will be live at `https://<username>.github.io/<repo-name>/`.
