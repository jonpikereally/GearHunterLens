# Gear Hunter Lens

A browser extension for Brave, Chrome, Edge and other Chromium browsers that **hides Long & McQuade GearHunter items you've already seen**, unless the price has changed.

GearHunter lists used, demo and clearance gear across every Long & McQuade store, and checking it means paging through the same items again and again. Gear Hunter Lens remembers every item you've looked at, and on later visits it blurs the ones you've seen, so new arrivals and markdowns stand out.

## What it does

- **Remembers what you've seen.** An item counts as seen once its *whole* card (photo, name, price and store) has been on screen for about a second. Cards cut off at the edge of the window don't count. Opening an item's page counts too.
- **Hides seen items on your next visit**, or after a reload, not while you're browsing, so the page doesn't jump. (Settings can hide them as soon as you scroll past.)
- **You choose how** (Settings → Hidden items):
  - **Blur them** (default): the item keeps its spot, blurred, with "Seen 2 days 4 hours ago · Click to show" on top. A **Blur strength** slider sets how blurred.
  - **Cover them**: the same with a solid panel.
  - **Remove them**: they disappear from the grid.

  Clicking a blurred item shows it for the rest of that visit, without opening it.
- **Shows markdowns.** If a seen item comes back at a different price, it stays visible with a tag: **↓ was $899.00** (green) or **↑ was $249.00** (orange). The popup lists recent price changes with the store they're at.
- **Reject items you're not interested in.** Hover any item and click the **✕** in its corner (or click **Not interested** on a blurred one). It gets a solid, opaque **"Manually rejected"** panel right away and on every later visit, whatever your blur setting, and even if the price changes. If it does change, the panel says so ("Now … (was … when you rejected it)"). Click the panel to peek for that visit, or **Undo** to un-reject. Settings shows how many you've rejected, with **Un-reject all**.
- **Toolbar badge** shows how many items are hidden on the current page.
- **Peek** at hidden items from the popup, or switch hiding off entirely.
- **Show seen items again** after 7, 30 or 90 days, if you like (default: never).
- **Backup and restore** what you've seen (Settings → Export / Import).

## Privacy

Everything stays in your browser (`chrome.storage.local`). Gear Hunter Lens has no server, no account and no analytics. It only runs on long-mcquade.com and only acts on GearHunter pages. For each item it stores the item number, name, price history, regular price, store, photo link and when you saw it. The only other network request is a check of this repo's `updates/latest.json` for new versions.

## Install (Brave)

1. Download the latest [GearHunterLens.zip](https://github.com/jonpikereally/GearHunterLens/raw/main/updates/GearHunterLens.zip) and unzip it somewhere permanent (not Downloads). Or clone this repo.
2. Open `brave://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and choose the `GearHunterLens` folder (the one containing `manifest.json`).
4. Pin it: click the puzzle-piece icon in the toolbar, then the pin next to Gear Hunter Lens.

The same steps work in Chrome (`chrome://extensions`) and Edge (`edge://extensions`).

## Updating

Gear Hunter Lens checks this repo for new versions at startup and every 6 hours, and shows a banner in the popup when one exists. You can also check by hand in Settings → Check for Updates…. To install an update, either `git pull` or replace the folder with the new zip, then click ↻ on Gear Hunter Lens in `brave://extensions`. What you've seen is kept, because it lives in the browser. Don't *remove* the extension, though: that deletes its data. Export a backup first if you need to.

## If Long & McQuade changes its pages

Gear Hunter Lens recognises item cards by their links (`/GearHunter/<item number>/<Name>.htm`) and reads the "Sale Price", "Regular Price" and store lines inside them. It ignores the "or from: $…/mo" financing line. If items stop being hidden or prices read wrong, please [open an issue](https://github.com/jonpikereally/GearHunterLens/issues).

## Errors

Every error Gear Hunter Lens shows has a code (e.g. `GH-301`) and a **Copy Error Details** button. See [ERRORS.md](ERRORS.md) for the full list.

## Development

No build step: plain JavaScript (Manifest V3). Built from the same core as [Marketplace Lens](https://github.com/jonpikereally/MarketplaceLens).

| Path | What it is |
|---|---|
| `manifest.json` | Extension manifest; `version` here is the release version |
| `src/content.js` | Runs on long-mcquade.com; tracks seen cards, blurs them, tags price changes |
| `src/background.js` | Service worker; toolbar badge and update checks |
| `src/shared/errors.js` | Error code catalogue (keep in sync with `ERRORS.md`) |
| `app/` | The popup |
| `tests/fake-gearhunter.html` | A stand-in GearHunter page with Long & McQuade's card markup that runs the real content script, with "next visit" and "markdown" buttons |
| `tests/popup-harness.html` | The popup with sample data |

To try the test pages: `python3 -m http.server 8794` in the repo root, then open `/tests/fake-gearhunter.html` or `/tests/popup-harness.html`. Unit tests: `node tests/content.test.mjs`.

**Releasing:** bump `version` in `manifest.json`, write `RELEASE_NOTES.txt`, and push to `main`. The GitHub Action builds `updates/GearHunterLens.zip` and `updates/latest.json`. Don't edit `updates/` by hand.

## License

MIT
