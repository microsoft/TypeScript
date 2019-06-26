
const MAX_UNICODE_CODEPOINT = 0x10FFFF;
const isStart = c => /[\p{ID_Start}\u{2118}\u{212E}\u{309B}\u{309C}]/u.test(c); // Other_ID_Start explicitly included for back compat - see http://www.unicode.org/reports/tr31/#Introduction
const isPart = c => /[\p{ID_Continue}\u{00B7}\u{0387}\u{19DA}\u{1369}\u{136A}\u{136B}\u{136C}\u{136D}\u{136E}\u{136F}\u{1370}\u{1371}]/u.test(c) || isStart(c); // Likewise for Other_ID_Continue
const parts = [];
let partsActive = false;
let startsActive = false;
const starts = [];

for (let i = 0; i < MAX_UNICODE_CODEPOINT; i++) {
    if (isStart(String.fromCodePoint(i)) !== startsActive) {
        starts.push(i - +startsActive);
        startsActive = !startsActive;
    }
    if (isPart(String.fromCodePoint(i)) !== partsActive) {
        parts.push(i - +partsActive);
        partsActive = !partsActive;
    }
}

console.log(`const unicodeESNextIdentifierStart = [${starts.join(", ")}];`);
console.log(`const unicodeESNextIdentifierPart = [${parts.join(", ")}];`);
