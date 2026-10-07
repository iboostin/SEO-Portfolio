# Hammad Asghar | SEO Portfolio

Static website (HTML, CSS, JavaScript). No build step, deploys on Vercel as-is.

## Pages
- `index.html` – Home: SERP-style hero, results explorer (Search Console data), case studies, services, process, tools, FAQ, free audit CTA
- `case-studies/equinecare.html`, `aigeo360.html`, `stsgcc.html`, `gamesgravity.html` – one page per case study
- `404.html`, `sitemap.xml`, `robots.txt`, `vercel.json`

## Deploy (GitHub + Vercel)
1. Create a new GitHub repository, e.g. `hammad-seo-portfolio`.
2. Upload the CONTENTS of this folder to the top level of the repo (not the folder itself). If the web upload skips folders, upload in batches: html/json/txt/xml files first, then the `case-studies` folder, then the `assets` folder.
3. On vercel.com: Add New → Project → import the repo. Framework Preset: Other. Root Directory: empty. Deploy.
4. If your Vercel address is not `https://hammad-seo-portfolio.vercel.app/`, search all files for that address (html, sitemap.xml, robots.txt) and replace it with your real one.

## Editing
- Numbers and text: generated from one data list; edit the html directly or ask for a regenerated build.
- Search Console screenshots: `assets/img/gsc-*.webp`.
- Colours and fonts: top of `assets/css/styles.css`.
