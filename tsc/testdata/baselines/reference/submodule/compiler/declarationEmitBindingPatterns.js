//// [tests/cases/compiler/declarationEmitBindingPatterns.ts] ////

//// [declarationEmitBindingPatterns.ts]
const k = ({x: z = 'y'}) => { }

var a;
function f({} = a, [] = a, { p: {} = a} = a) {
}

//// [declarationEmitBindingPatterns.js]
const k = ({ x: z = 'y' }) => { };
var a;
function f({} = a, [] = a, { p: {} = a } = a) {
}
