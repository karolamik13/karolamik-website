# Karolina Mikulska-Ruminska — academic website

English-first static academic website prepared for GitHub and deployment to the NCU `public_html` directory.

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Structure prepared for later expansion

### Research detail pages

The four cards on `research.html` now link to separate pages in:

```text
research/
├── regulated-cell-death.html
├── lipid-protein-membrane.html
├── biotechnological-enzymes.html
└── computational-methods.html
```

These pages already provide a basic template and can later be expanded with longer descriptions, selected publications and additional figures without redesigning the main Research page.

### Research images

Images inside the four main Research cards are still controlled from:

```text
data/research-topic-images.js
```

Put the files in:

```text
assets/images/research/
```

Each detailed Research page also has a hidden main image slot. To make it appear automatically, add the corresponding PNG file:

```text
assets/images/research/regulated_cell_death.png
assets/images/research/lipid_protein_membrane.png
assets/images/research/biotechnological_enzymes.png
assets/images/research/computational_methods.png
```

If the image is absent, no empty placeholder is displayed.

### Software logos

The Software page is ready for logos. Add PNG files with these exact names:

```text
assets/images/software/cavitracer_logo.png
assets/images/software/insty_logo.png
assets/images/software/watfinder_logo.png
assets/images/software/mechstiff_logo.png
```

The corresponding logo appears automatically; if the file is absent, the layout stays unchanged.

### Team photo

The Team page is ready for one group photo below the current-member cards. Add:

```text
assets/images/team/team_photo.jpg
```

The photo appears automatically. A `Former Members & Alumni →` link below the current team leads directly to the alumni/mentoring section.

## Recommended Git workflow

Keep one canonical local repository, for example:

```bash
~/karolamik_website
```

Commit your own edits before copying in a newer version. Git records and compares changes, but copying a file over an uncommitted file replaces that working copy rather than merging it automatically.

### Safe update from a future ZIP version

1. Commit/push your current work.
2. Extract the new ZIP somewhere temporary.
3. From your Git repository run:

```bash
./update-site.sh /path/to/extracted/new-version
```

Then review:

```bash
git status
git diff
```

and commit:

```bash
git add -A
git commit -m "Update website"
git push
```

## Deployment to NCU

Once the site is ready, synchronize the public files to `~/public_html/`. Keep the Git repository itself outside `public_html` unless you intentionally want repository metadata on the web server.

## v10

Prepared the site for later expansion without changing the established visual design: clickable Research-topic pages, hidden research-image slots, automatic Software-logo slots, an automatic Team-photo slot, and a direct `Former Members & Alumni` link to Mentoring.
