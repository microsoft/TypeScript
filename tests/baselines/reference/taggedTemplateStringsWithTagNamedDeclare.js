//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTagNamedDeclare.ts] ////

//// [taggedTemplateStringsWithTagNamedDeclare.ts]
function declare(x: any, ...ys: any[]) {
}

declare `Hello ${0} world!`;

//// [taggedTemplateStringsWithTagNamedDeclare.js]
function declare(x, ...ys) {
}
declare `Hello ${0} world!`;
