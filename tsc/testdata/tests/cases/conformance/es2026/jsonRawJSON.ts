// @target: esnext
// @lib: es2025,es2026.json
// @noEmit: true
// @strict: true

const raw = JSON.rawJSON("12345678901234567890");
const rawText: string = raw.rawJSON;
const serialized: string = JSON.stringify({ value: raw });

raw.rawJSON = "0";

declare const value: unknown;
if (JSON.isRawJSON(value)) {
    const narrowedText: string = value.rawJSON;
}
