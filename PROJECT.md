# Tariq Iqbal Portfolio — Project Reference & Runbook

> Last updated: 2026-04-04  
> Maintained by: Tariq Iqbal ([@techcybernetics](https://github.com/techcybernetics))

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [URLs & Dashboards](#4-urls--dashboards)
5. [Repository Structure](#5-repository-structure)
6. [GitHub Secrets](#6-github-secrets)
7. [Runbook](#7-runbook)
   - [Deploy manually](#71-deploy-manually)
   - [Update portfolio content](#72-update-portfolio-content)
   - [Run news update manually](#73-run-news-update-manually)
   - [Edit or add news articles](#74-edit-or-add-news-articles)
   - [Check deployment logs](#75-check-deployment-logs)
   - [Rotate secrets](#76-rotate-secrets)
   - [Re-initialize Firebase locally](#77-re-initialize-firebase-locally)
8. [Automated Workflows](#8-automated-workflows)
9. [Analytics](#9-analytics)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Project Overview

A personal portfolio website for Tariq Iqbal — Senior Engineering Manager (VP) at JP Morgan Chase. The site features:

- **Home** — Hero section with role, subtitle, social links, resume CTA
- **Experience** — Timeline of work history (JP Morgan Chase, Cognizant)
- **Education** — Degree cards (NJIT M.S. Computer Science, AEC B.Tech)
- **Contact** — Email, LinkedIn, GitHub links
- **AI News** — Daily-updated tech news feed (AI, Robotics, Innovation), curated automatically by a Claude Code scheduled agent

---

## 2. Architecture

```
Developer pushes to main
        │
        ▼
GitHub Actions: firebase-deploy.yml
        │
        ├── npm ci
        ├── npm run build
        └── firebase deploy → tariqiqbal-portfolio.web.app
                                        │
                                        └── GoatCounter tracks visitors
                                            dashboard: tariq.goatcounter.com

Daily at 7:00 AM UTC
        │
        ▼
Claude Code Scheduled Agent (trig_015fEmDGgYUoMNfgj3Fk4cTW)
        │
        ├── WebSearch: AI + Robotics + Innovation news
        ├── Writes public/news.json
        └── git commit + push → triggers firebase-deploy.yml above
```

---

## 3. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React (Create React App) | 16.x |
| Routing | react-router-dom | 5.x |
| Styling | CSS Custom Properties (no CSS framework) | — |
| Font | Inter + JetBrains Mono (Google Fonts) | — |
| Icons | Font Awesome 6 (CDN) | 6.5.1 |
| Hosting | Firebase Hosting | — |
| Analytics | GoatCounter | — |
| CI/CD | GitHub Actions | — |
| News AI | Claude API (claude-opus-4-6) | — |
| Scheduler | Claude Code Remote Agent | — |

---

## 4. URLs & Dashboards

| Resource | URL |
|---|---|
| **Live site** | https://tariqiqbal-portfolio.web.app |
| **GitHub repo** | https://github.com/techcybernetics/techcybernetics.github.io |
| **GitHub Actions** | https://github.com/techcybernetics/techcybernetics.github.io/actions |
| **GitHub Secrets** | https://github.com/techcybernetics/techcybernetics.github.io/settings/secrets/actions |
| **Firebase Console** | https://console.firebase.google.com/project/tariqiqbal-portfolio/overview |
| **Firebase Hosting** | https://console.firebase.google.com/project/tariqiqbal-portfolio/hosting |
| **GoatCounter Analytics** | https://tariq.goatcounter.com |
| **Scheduled Agent** | https://claude.ai/code/scheduled/trig_015fEmDGgYUoMNfgj3Fk4cTW |
| **Anthropic Console** | https://console.anthropic.com/settings/api-keys |

---

## 5. Repository Structure

```
masterPortfolio/
├── .github/
│   └── workflows/
│       ├── firebase-deploy.yml     # Auto-deploy on push to main
│       └── update-news.yml         # Daily AI news update + deploy
├── public/
│   ├── index.html                  # GoatCounter script lives here
│   └── news.json                   # AI news data (updated daily by agent)
├── scripts/
│   └── fetch-news.js               # Calls Claude API to generate news.json
├── src/
│   ├── portfolio.js                # ★ ALL personal data lives here
│   ├── firebase.js                 # Firebase SDK config + Analytics init
│   ├── index.css                   # CSS custom properties (design tokens)
│   ├── theme.js                    # JS theme object (dark theme)
│   ├── components/
│   │   ├── header/                 # Sticky nav with hamburger
│   │   ├── footer/                 # Footer with social links
│   │   ├── socialMedia/            # Social icon links
│   │   ├── button/                 # Reusable button
│   │   └── topButton/              # Scroll-to-top button
│   ├── containers/
│   │   ├── greeting/               # Hero section
│   │   └── skills/                 # Skills/expertise cards
│   └── pages/
│       ├── home/                   # Home page (Hero + Skills)
│       ├── experience/             # Experience timeline
│       ├── education/              # Education cards
│       ├── contact/                # Contact page
│       └── news/                   # AI News feed page
├── firebase.json                   # Firebase hosting config (SPA rewrites)
├── .firebaserc                     # Firebase project: tariqiqbal-portfolio
└── package.json                    # homepage: https://techcybernetics.github.io
```

---

## 6. GitHub Secrets

Two secrets must be set at:  
https://github.com/techcybernetics/techcybernetics.github.io/settings/secrets/actions

| Secret | Purpose | How to get |
|---|---|---|
| `FIREBASE_TOKEN` | Allows GitHub Actions to deploy to Firebase | Run `firebase login:ci` in Terminal |
| `ANTHROPIC_API_KEY` | Allows news script to call Claude API | https://console.anthropic.com/settings/api-keys |

> **Token expiry:** `FIREBASE_TOKEN` from `firebase login:ci` is long-lived but can be revoked. If deploys start failing with auth errors, regenerate it (see [Rotate Secrets](#76-rotate-secrets)).

---

## 7. Runbook

### 7.1 Deploy manually

```bash
# From the project directory:
npm run build
firebase deploy --only hosting
```

Or push any commit to `main` — GitHub Actions deploys automatically.

---

### 7.2 Update portfolio content

All personal data is in one file: **`src/portfolio.js`**

| Section | What to edit |
|---|---|
| Name, subtitle, resume link | `greeting` object |
| Social media links | `socialMediaLinks` array |
| Skills & tech stack | `skills.data` array |
| Work experience | `experience.sections[0].experiences` array |
| Education | `degrees.degrees` array |
| Contact description | `contactPageData.contactSection.description` |

After editing, commit and push — auto-deploys in ~2 minutes.

```bash
git add src/portfolio.js
git commit -m "content: update [what you changed]"
git push
```

---

### 7.3 Run news update manually

**Option A — Locally** (requires `ANTHROPIC_API_KEY` in environment):
```bash
export ANTHROPIC_API_KEY=sk-ant-...
node scripts/fetch-news.js
# Updates public/news.json
git add public/news.json
git commit -m "chore: manual news update"
git push
```

**Option B — Trigger GitHub Action manually:**
1. Go to https://github.com/techcybernetics/techcybernetics.github.io/actions
2. Click **Daily AI News Update**
3. Click **Run workflow** → **Run workflow**

**Option C — Trigger Claude scheduled agent now:**
- Go to https://claude.ai/code/scheduled/trig_015fEmDGgYUoMNfgj3Fk4cTW
- Click **Run now**

---

### 7.4 Edit or add news articles

News is stored in `public/news.json`. Structure:

```json
{
  "lastUpdated": "2026-04-04",
  "articles": [
    {
      "id": "1",
      "title": "Article headline",
      "summary": "2-3 sentence summary for engineers",
      "source": "Publication Name",
      "url": "https://article-url.com",
      "category": "AI",
      "date": "2026-04-04"
    }
  ]
}
```

**Valid categories:** `AI` | `Robotics` | `Innovation`

Edit the file, then:
```bash
git add public/news.json
git commit -m "chore: update news"
git push
```

---

### 7.5 Check deployment logs

- **GitHub Actions logs:** https://github.com/techcybernetics/techcybernetics.github.io/actions
- **Firebase Hosting releases:** https://console.firebase.google.com/project/tariqiqbal-portfolio/hosting
- **Scheduled agent runs:** https://claude.ai/code/scheduled/trig_015fEmDGgYUoMNfgj3Fk4cTW

---

### 7.6 Rotate secrets

**Rotate FIREBASE_TOKEN:**
```bash
# In Terminal (not Claude Code):
firebase login:ci
# Copy the new token
```
Then update at:  
https://github.com/techcybernetics/techcybernetics.github.io/settings/secrets/actions  
→ click `FIREBASE_TOKEN` → **Update secret**

**Rotate ANTHROPIC_API_KEY:**
1. Go to https://console.anthropic.com/settings/api-keys
2. Create new key → copy it
3. Update `ANTHROPIC_API_KEY` secret in GitHub (same as above)
4. Update your local environment if you use it locally

---

### 7.7 Re-initialize Firebase locally

If you set up on a new machine or Firebase auth expires:

```bash
npm install -g firebase-tools
firebase login
firebase use tariqiqbal-portfolio
```

Test deploy:
```bash
npm run build && firebase deploy --only hosting
```

---

## 8. Automated Workflows

### `firebase-deploy.yml` — Deploy on push
**Trigger:** Every push to `main`  
**Steps:** checkout → `npm ci` → `npm run build` → `firebase deploy`  
**Duration:** ~2-3 minutes

### `update-news.yml` — Daily AI news
**Trigger:** Every day at 7:00 AM UTC (3:00 AM ET)  
**Steps:** checkout → `node scripts/fetch-news.js` → commit `news.json` → `npm run build` → `firebase deploy`  
**Duration:** ~3-4 minutes  
**Requires secrets:** `ANTHROPIC_API_KEY`, `FIREBASE_TOKEN`

### Claude Code Scheduled Agent — `trig_015fEmDGgYUoMNfgj3Fk4cTW`
**Trigger:** Every day at 7:00 AM UTC  
**What it does:** WebSearch → writes `news.json` → git push  
**Manage:** https://claude.ai/code/scheduled/trig_015fEmDGgYUoMNfgj3Fk4cTW

> Note: Both the GitHub Action and the Claude agent run daily. The agent pushes `news.json` which triggers the GitHub Action to deploy. The GitHub Action also has its own `fetch-news.js` script as a fallback.

---

## 9. Analytics

**GoatCounter** tracks all page views at https://tariq.goatcounter.com

- **What's tracked:** page views, unique visitors, referrers, countries, browsers, screen sizes
- **Privacy:** no cookies, GDPR compliant, no Google dependency
- **Free tier:** up to 100,000 page views/month
- **Script location:** `public/index.html` (bottom of `<body>`)

**Firebase costs** (Spark free tier):
- 10 GB/month transfer — enough for ~20,000 visits/month at no cost
- If exceeded: ~$0.15/GB overage (very cheap)

---

## 10. Troubleshooting

### GitHub Action fails: "Firebase: Authentication error"
→ `FIREBASE_TOKEN` has expired or been revoked.  
→ Run `firebase login:ci` in Terminal, update the secret. See [7.6 Rotate Secrets](#76-rotate-secrets).

### GitHub Action fails: "ANTHROPIC_API_KEY not set"
→ Secret is missing or misspelled in GitHub.  
→ Check https://github.com/techcybernetics/techcybernetics.github.io/settings/secrets/actions

### News page shows stale data / not updating
→ Check if the scheduled agent last ran: https://claude.ai/code/scheduled/trig_015fEmDGgYUoMNfgj3Fk4cTW  
→ Check GitHub Actions for `update-news.yml` failures  
→ Run manually: see [7.3 Run news update manually](#73-run-news-update-manually)

### Site looks broken after a push
→ Check GitHub Actions logs for build errors  
→ Run `npm run build` locally to reproduce  
→ Previous deploy is still live — Firebase keeps the last successful release

### Local dev server not starting
```bash
npm install   # reinstall dependencies
npm start     # start dev server at localhost:3000
```

### Need to add a new page
1. Create `src/pages/newpage/NewPage.js` + `NewPage.css`
2. Add route in `src/containers/Main.js`
3. Add nav link in `src/components/header/Header.js` (`navLinks` array)
4. Commit and push

---

*For questions or issues, open a conversation with Claude Code in this project directory.*
