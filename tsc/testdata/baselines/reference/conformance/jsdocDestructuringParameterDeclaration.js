//// [tests/cases/conformance/jsdoc/jsdocDestructuringParameterDeclaration.ts] ////

//// [a.js]
/**
 * @param {{ a: number; b: string }} args
 */
function f({ a, b }) {}




//// [a.d.ts]
/**
 * @param {{ a: number; b: string }} args
 */
declare function f({ a, b }: {
    a: number;
    b: string;
}): void;
