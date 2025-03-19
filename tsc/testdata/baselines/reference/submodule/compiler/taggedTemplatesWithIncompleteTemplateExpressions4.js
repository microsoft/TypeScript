//// [tests/cases/compiler/taggedTemplatesWithIncompleteTemplateExpressions4.ts] ////

//// [taggedTemplatesWithIncompleteTemplateExpressions4.ts]
function f(x: TemplateStringsArray, y: string, z: string) {
}

// Incomplete call, but too many parameters.
f `123qdawdrqw${ 1 }${ }${ 

//// [taggedTemplatesWithIncompleteTemplateExpressions4.js]
function f(x, y, z) {
}
// Incomplete call, but too many parameters.
f `123qdawdrqw${1}${}${;
