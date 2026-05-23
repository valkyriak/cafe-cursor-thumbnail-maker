# Submit to the Cafe Cursor Brisbane board

Follow the [contribution guide](https://github.com/0NATE4/Cafe-Cursor-Brisbane#add-your-card) on the main repo. This checklist covers both publishing **this tool** and adding **your card** to the board.

## Part A — Publish this thumbnail maker (your fork)

1. **Create a new repo on GitHub** (e.g. `valkyriak/cafe-cursor-thumbnail-maker`) — empty, no README.

2. **Push this project** from the project root:

   ```bash
   git init
   git add .
   git commit -m "Add Cafe Cursor Brisbane thumbnail maker"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/cafe-cursor-thumbnail-maker.git
   git push -u origin main
   ```

3. Update `contribution/cafe-cursor-thumbnail-maker.json` if your repo URL or GitHub username differs from `valkyriak`.

## Part B — Export your cover image

1. Run the app: `npm run dev`
2. Open the editor, upload a screenshot of the app (or a sample project), pick a frame and background.
3. Export **PNG** at 2× — save as:

   ```
   cover.png
   ```

   You will copy this into the board repo in Part C.

## Part C — Add your card (fork of Cafe-Cursor-Brisbane)

1. **Fork** [0NATE4/Cafe-Cursor-Brisbane](https://github.com/0NATE4/Cafe-Cursor-Brisbane) on GitHub.

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR-GITHUB-USERNAME/Cafe-Cursor-Brisbane.git
   cd Cafe-Cursor-Brisbane
   git checkout -b cafe-cursor-thumbnail-maker
   ```

3. **Copy the contribution JSON** from this repo:

   ```bash
   cp /path/to/CursorBrisbaneProject/contribution/cafe-cursor-thumbnail-maker.json \
      src/content/contributions/cafe-cursor-thumbnail-maker.json
   ```

   Or copy the contents of `contribution/cafe-cursor-thumbnail-maker.json` manually. Do **not** edit `_template.json`.

4. **Add the cover image**:

   ```bash
   mkdir -p public/contributions/cafe-cursor-thumbnail-maker
   cp /path/to/cover.png public/contributions/cafe-cursor-thumbnail-maker/cover.png
   ```

5. **Preview locally** (optional):

   ```bash
   npm install
   npm run dev
   ```

   Open the local URL and confirm your card appears on the board.

6. **Commit and push to your fork**:

   ```bash
   git add src/content/contributions/cafe-cursor-thumbnail-maker.json
   git add public/contributions/cafe-cursor-thumbnail-maker/cover.png
   git commit -m "Add cafe-cursor-thumbnail-maker project card"
   git push -u origin cafe-cursor-thumbnail-maker
   ```

7. **Open a pull request** on GitHub:
   - Base: `0NATE4/Cafe-Cursor-Brisbane` → `main`
   - Compare: your fork → `cafe-cursor-thumbnail-maker`

   After merge, your card appears on [cafecursorbrisbane.com](https://cafecursorbrisbane.com).

## Files in this repo

| File | Purpose |
|------|---------|
| `contribution/cafe-cursor-thumbnail-maker.json` | Ready-to-copy board card metadata |
| `docs/SUBMIT_TO_BOARD.md` | This checklist |

## GitHub CLI (optional)

If `gh auth login` is configured:

```bash
gh repo create cafe-cursor-thumbnail-maker --public --source=. --remote=origin --push
gh repo fork 0NATE4/Cafe-Cursor-Brisbane --clone
# …then copy JSON + cover into the fork and:
gh pr create --repo 0NATE4/Cafe-Cursor-Brisbane --base main --head YOUR-GITHUB-USERNAME:cafe-cursor-thumbnail-maker
```
