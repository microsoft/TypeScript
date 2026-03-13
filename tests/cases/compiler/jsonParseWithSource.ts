// @lib: es2025
// @strictNullChecks: true

// JSON.rawJSON
const raw = JSON.rawJSON("123");
const rawStr: string = raw.rawJSON;
JSON.stringify({ value: raw });
JSON.stringify({ n: JSON.rawJSON("12345678901234567890") });

// JSON.isRawJSON
const maybeRaw: unknown = {};
if (JSON.isRawJSON(maybeRaw)) {
    const text: string = maybeRaw.rawJSON;
}

// JSON.parse with reviver context
JSON.parse('{"key":123}', (key, value, context) => {
    const src: string = context.source;
    return value;
});

// Existing JSON.parse overloads still work
JSON.parse("{}");
JSON.parse('{"a":1}', (key, value) => value);
