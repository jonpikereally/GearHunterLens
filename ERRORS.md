# Gear Hunter Lens error codes

Every problem Gear Hunter Lens can show you has a code like `GH-301`. Find yours below.

**Getting help from an AI assistant:** click **Copy Error Details** on the error, then paste it into ChatGPT, Claude or similar along with a link to this page. For a plain-text copy that's easy for AI assistants to read, use https://raw.githubusercontent.com/jonpikereally/GearHunterLens/main/ERRORS.md

Codes are grouped: `1xx` updates, `2xx` reading GearHunter pages, `3xx` saved data, `4xx` backup import/export, `999` anything else. Codes are never reused or renumbered.

| Code | What happened | What to try |
|---|---|---|
| `GH-101` | Gear Hunter Lens couldn't reach the update feed. | Check your internet connection. If you set a custom Update source in Settings, make sure the URL is right, or clear it. |
| `GH-102` | The update feed answered, but not with a valid `latest.json`. | Clear the Update source in Settings to go back to the built-in GitHub feed. If you're already on it, open an issue. |
| `GH-201` | Reading a GearHunter page failed. Long & McQuade may have changed its page layout. | Reload the page. If it keeps happening, copy the details and open an issue. |
| `GH-301` | Reading or saving the items you've seen failed. | Restart Brave. If it persists, export a backup from Settings and copy the details. |
| `GH-302` | Saving failed because the browser's storage is full. | Free some disk space, or use Settings → Forget all seen items. |
| `GH-401` | The file you chose to import isn't a Gear Hunter Lens backup. | Choose a `.json` file made by the Export backup button. |
| `GH-402` | Creating the backup file failed. | Try again. If it repeats, copy the details and open an issue. |
| `GH-999` | Something unexpected went wrong. | Copy the details and paste them into an AI assistant with a link to this page, or open an issue. |
