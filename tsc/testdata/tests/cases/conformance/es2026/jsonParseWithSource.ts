// @target: esnext
// @lib: es2025,es2026.json
// @noEmit: true
// @strict: true

JSON.parse('{"value": 1}', function (key, parsedValue, context) {
    const source: string | undefined = context.source;
    return parsedValue;
});
