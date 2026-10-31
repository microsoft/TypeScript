// @target: esnext
// @lib: es2025,es2026.json
// @noEmit: true
// @strict: true

JSON.parse('{"value": 1}', function (key, parsedValue, context) {
    const source: string | undefined = context.source;
    return parsedValue;
});

declare const text: string;
declare const condition: boolean;

JSON.parse(text);
JSON.parse(text, undefined);
JSON.parse.call(JSON, text);
JSON.parse.apply(JSON, [text]);

type P = Parameters<typeof JSON.parse>;
function parse(...args: P) {
    return JSON.parse(...args);
}
parse(text);

function parseWith(input: string, reviver?: P[1]) {
    return JSON.parse(input, reviver);
}

const a = JSON.parse.bind(JSON);
a(text);

JSON.parse(text, condition ? (key, value, context) => {
    const source: string | undefined = context.source;
    return value;
} : undefined);
