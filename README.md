# luminousgroup.io

Static one-page website for Luminous Group, LLC. No build step — plain HTML, CSS, and JS.

## Files

- `index.html` — page structure and content
- `styles.css` — all styling
- `script.js` — nav toggle, form submission
- `assets/images/` — logo, favicons
- `assets/team/` — team headshots

## Local preview

From this folder:

```
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Contact form

The form submits to [Formspree](https://formspree.io). Replace `REPLACE_WITH_YOUR_FORMSPREE_ID` in `index.html` with the form's actual ID before deployment.

## Deployment

Hosted on Cloudflare Pages, pulling from this repository.
