//// [tests/cases/compiler/taggedTemplatesWithIncompleteNoSubstitutionTemplate2.ts] ////

//// [taggedTemplatesWithIncompleteNoSubstitutionTemplate2.ts]
function f(x: TemplateStringsArray, y: string, z: string) {
}

// Incomplete call, not enough parameters, at EOF.
f `

//// [taggedTemplatesWithIncompleteNoSubstitutionTemplate2.js]
function f(x, y, z) {
}
// Incomplete call, not enough parameters, at EOF.
f `;
