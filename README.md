# StoryMesh Prototype v0.1

A responsive, static HTML/CSS/JavaScript concept prototype for an interactive collaborative storytelling platform.

## Features
- Responsive mobile-first landing page
- Three original sample story cards and genre filters
- Interactive story modal with choice voting
- Story choice demo stored in the current browser's local storage
- Contributor form with local session-only preview
- Viewer / contributor / creator onboarding choices
- Accessible labels, keyboard Escape-to-close modal, reduced-motion support
- No backend, accounts, payments, public uploads, or real creator payouts

## Run it
1. Extract `StoryMesh_Prototype_v1.zip`.
2. Open `index.html` in a browser.
3. For local development, you can also use any static web server.

## Deploy to Cloudflare Pages (free static prototype)
1. Extract the zip.
2. Open Cloudflare Dashboard -> Workers & Pages -> Create -> Pages (wording may vary).
3. Choose direct upload / upload assets if available, and upload the extracted project files, keeping `index.html`, `styles.css`, and `app.js` together.
4. Deploy and open the generated URL.
5. Test the page on your phone and desktop.

Cloudflare's dashboard and deployment options may change. For Git-based deployments, place these files in a repository and connect it to Pages with no build command and the project root as the output directory.

## Important limitations
- This is a design and interaction prototype, not a production service.
- Votes are local demo interactions; they are not aggregated across users.
- Contributions are stored only in the current browser session and are not published.
- No login, secure database, moderation console, rights management, upload service, or payment system exists.
- All sample story concepts and interface copy are illustrative. Use original or properly licensed content only.
- Before accepting real users or creator earnings, implement backend security, privacy controls, moderation, copyright/licensing workflows, and transparent creator agreements.
