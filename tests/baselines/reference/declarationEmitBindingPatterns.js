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


//// [declarationEmitBindingPatterns.d.ts]
declare const k: ({ x: z }: {
    x?: string;
}) => void;
declare var a: any;
declare function f({}?: any, []?: any, { p: {} }?: any): void;
