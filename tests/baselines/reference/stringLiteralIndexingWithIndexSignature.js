//// [tests/cases/compiler/stringLiteralIndexingWithIndexSignature.ts] ////

//// [stringLiteralIndexingWithIndexSignature.ts]
interface Dic<T> {
    [key: string]: T;
}

function getVal<T, K extends string>(obj: Dic<T>, key: K) {
    // This is the classic failure point for #30408
    // It should resolve to 'T', but often resolves to 'any' or errors
    return obj[key];
}

type Specific = Dic<number>["some_literal"]; // Should be 'number'

//// [stringLiteralIndexingWithIndexSignature.js]
function getVal(obj, key) {
    // This is the classic failure point for #30408
    // It should resolve to 'T', but often resolves to 'any' or errors
    return obj[key];
}
