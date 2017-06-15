//// [taggedTemplatesWithIncompleteNoSubstitutionTemplate1.ts]
function f(x: TemplateStringsArray, y: string, z: string) {
}

// Incomplete call, not enough parameters.
f `123qdawdrqw

//// [taggedTemplatesWithIncompleteNoSubstitutionTemplate1.js]
function f(x, y, z) {
}
// Incomplete call, not enough parameters.
f `123qdawdrqw;
