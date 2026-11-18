// @target: esnext
// @lib: es2025,es2026.json
// @noEmit: true
// @strict: true

const a = JSON.rawJSON("12345678901234567890");
const b: string = a.rawJSON;
const c: string = JSON.stringify({ value: a });

a.rawJSON = "0";

declare const d: unknown;
if (JSON.isRawJSON(d)) {
    const e: string = d.rawJSON;
}
