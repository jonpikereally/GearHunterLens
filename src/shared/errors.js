// Every error a user can see has a stable code. Never reuse or renumber.
// The public list lives in ERRORS.md; scripts/check-errors.sh fails the
// build if a code used in src/ or app/ is missing from it.
//   1xx updates   2xx reading GearHunter pages   3xx saved data
//   4xx import/export   999 unexpected

export const REPO = "jonpikereally/GearHunterLens";
export const ERROR_LIST_URL = `https://github.com/${REPO}/blob/main/ERRORS.md`;
export const ERROR_LIST_RAW = `https://raw.githubusercontent.com/${REPO}/main/ERRORS.md`;
export const ERROR_HOVER = `Look this code up on the Gear Hunter Lens error list: ${ERROR_LIST_URL}`;

export const ERRORS = {
  "GH-101": ["Couldn't reach the update feed.", "Check your internet connection, or the Update source in Settings."],
  "GH-102": ["The update feed returned something unreadable.", "Clear the Update source in Settings to go back to the built-in feed."],
  "GH-201": ["Something went wrong while reading a GearHunter page.", "Reload the page. If it keeps happening, copy the details."],
  "GH-301": ["Couldn't read or save the items you've seen.", "Restart Brave. If it persists, export a backup and copy the details."],
  "GH-302": ["Couldn't save: the browser's storage is full.", "Free some disk space, or use Forget all seen items."],
  "GH-401": ["That file isn't a Gear Hunter Lens backup.", "Choose a .json file made by the Export backup button."],
  "GH-402": ["Couldn't create the backup file.", "Try again; if it repeats, copy the details."],
  "GH-999": ["Something unexpected went wrong.", "Copy the details and paste them into an AI assistant along with the error list link."],
};

export function describe(code) {
  const [summary, hint] = ERRORS[code] || ERRORS["GH-999"];
  return { code: ERRORS[code] ? code : "GH-999", summary, hint };
}

export function detailsText(err, version) {
  const d = describe(err.code);
  return [
    `Gear Hunter Lens error ${d.code}: ${d.summary}`,
    `What to try: ${d.hint}`,
    err.details ? `Details: ${err.details}` : null,
    `When: ${new Date(err.t || Date.now()).toISOString()}`,
    `Gear Hunter Lens version: ${version}`,
    `Browser: ${navigator.userAgent}`,
    `Error list: ${ERROR_LIST_URL}`,
    `Error list (plain text for AI assistants): ${ERROR_LIST_RAW}`,
  ].filter(Boolean).join("\n");
}

export async function logError(code, details) {
  const { errors = [] } = await chrome.storage.local.get("errors");
  errors.push({ code, details: details ? String(details).slice(0, 2000) : null, t: Date.now() });
  await chrome.storage.local.set({ errors: errors.slice(-100) });
  console.warn(`Gear Hunter Lens ${code}`, details || "");
}
