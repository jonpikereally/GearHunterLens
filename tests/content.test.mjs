// Run: node tests/content.test.mjs
// Checks how GearHunter cards are read, without a browser.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/content.js", import.meta.url), "utf8");
const pick = (re) => src.match(re)[0];
const location = { href: "https://www.long-mcquade.com/GearHunter/departments/12/Guitars/Electric.htm" };
const { readCard, priceValue } = new Function("location",
  pick(/  const ITEM_ID = .*\n/) + pick(/  function priceValue[\s\S]*?\n  }\n/) + pick(/  const moneyIn = .*\n/) + pick(/  function readCard[\s\S]*?\n  }\n/) + "return { readCard, priceValue };"
)(location);

for (const [t, v] of [["$5,775.00", 5775], ["$163", 163], ["$1,299.99", 1299.99], ["$99.00", 99], [null, null]]) assert.equal(priceValue(t), v, String(t));

const card = (href, title, text) => ({ getAttribute: (n) => (n === "href" ? href : n === "title" ? title : null), innerText: text, querySelector: () => null });
let c = readCard(card("/GearHunter/935664/Fender-Custom-Shop-923-5001-539.htm", "Fender Custom Shop - 923-5001-539",
  "Fender Custom Shop - 923…\nFender Custom Shop - 923-5001-539\nSale Price: $5,775.00\nor from: $267.00/mo\nRegular Price: $6,275.00\nVaudreuil-Dorion,\nQuebec\n450 510-2140"));
assert.deepEqual([c.id, c.title, c.price, c.value, c.regular, c.place], ["935664", "Fender Custom Shop - 923-5001-539", "$5,775.00", 5775, "$6,275.00", "Vaudreuil-Dorion, Quebec"]);
assert.equal(c.url, "https://www.long-mcquade.com/GearHunter/935664/Fender-Custom-Shop-923-5001-539.htm");
// Financing never wins, even listed first.
c = readCard(card("/GearHunter/1/x.htm", "X", "X\nor from: $24.00/mo\nSale Price: $163.00\nRegular Price: $172.00\nOshawa,\nOntario"));
assert.deepEqual([c.price, c.regular, c.place], ["$163.00", "$172.00", "Oshawa, Ontario"]);
// No "Sale Price" label: first plain dollar amount.
c = readCard(card("/GearHunter/2/y.htm", "", "Yamaha thing\n$450.00\nToronto,\nOntario"));
assert.deepEqual([c.title, c.price, c.value], ["Yamaha thing", "$450.00", 450]);
// Department links aren't items.
assert.equal(readCard(card("/GearHunter/guitars/", "", "Guitars")), null);
assert.equal(readCard(card("/GearHunter/departments/12/Guitars/Electric.htm", "", "Electric")), null);

// "Seen … ago" wording.
const { ago } = new Function(pick(/  const unit = .*\n/) + pick(/  function ago\(t\)[\s\S]*?\n  }\n/) + "return { ago };")();
const now = Date.now(), M = 60e3, H = 60 * M, D = 24 * H;
for (const [dt, want] of [[45e3, "45 seconds ago"], [12 * M, "12 minutes ago"], [3 * H + 20 * M, "3 hours 20 minutes ago"], [2 * D + 4 * H, "2 days 4 hours ago"]]) assert.equal(ago(now - dt), want);
console.log("All content tests passed.");
