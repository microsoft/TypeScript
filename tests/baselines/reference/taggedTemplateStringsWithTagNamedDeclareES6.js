//// [taggedTemplateStringsWithTagNamedDeclareES6.ts]
function declare(x: any, ...ys: any[]) {
}

declare `Hello ${0} world!`;

//// [taggedTemplateStringsWithTagNamedDeclareES6.js]
function declare(x, ...ys) {
}
declare `Hello ${0} world!`;
