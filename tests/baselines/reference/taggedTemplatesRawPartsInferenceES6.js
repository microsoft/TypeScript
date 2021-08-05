//// [taggedTemplatesRawPartsInferenceES6.ts]
function tag<TParts extends readonly string[], TRaw extends readonly string[], U extends readonly unknown[]>(strs: TemplateStringsArray<TParts, TRaw>, ...args: U): {parts: TParts; raw: TRaw; args: U} {
    return null;
}

var a = tag `part\1${''}part\2`;
var a: {};


//// [taggedTemplatesRawPartsInferenceES6.js]
function tag(strs, ...args) {
    return null;
}
var a = tag `part\1${''}part\2`;
var a;
