//// [tests/cases/compiler/taggedTemplatesWithIncompleteTemplateExpressions3.ts] ////

//// [taggedTemplatesWithIncompleteTemplateExpressions3.ts]
function f(x: TemplateStringsArray, y: string, z: string) {
}

// Incomplete call, not enough parameters.
f `123qdawdrqw${ 1 }${

//// [taggedTemplatesWithIncompleteTemplateExpressions3.js]
function f(x, y, z) {
}
// Incomplete call, not enough parameters.
f `123qdawdrqw${1}${;
