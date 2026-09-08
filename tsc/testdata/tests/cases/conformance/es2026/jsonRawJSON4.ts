// @target: esnext
// @lib: es2025,es2026.json
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true

// @filename: raw.js
/** @type {RawJSON} */
const a = JSON.rawJSON("1");
/** @type {string} */
const b = a.rawJSON;

/** @type {RawJSON} */
const c = { rawJSON: "1" };
/** @type {RawJSON} */
const d = { ...a };
a.rawJSON = "2";

/** @param {unknown} x */
function f(x) {
    return JSON.isRawJSON(x) ? x.rawJSON : undefined;
}

RawJSON;
RawJSONBase;
