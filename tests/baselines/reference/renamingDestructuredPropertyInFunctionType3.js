//// [tests/cases/compiler/renamingDestructuredPropertyInFunctionType3.ts] ////

//// [renamingDestructuredPropertyInFunctionType3.ts]
const sym = Symbol();
type O = Record<symbol, unknown>
type F14 = ({ [sym]: string }: O) => void; // Error
type G14 = new ({ [sym]: string }: O) => void; // Error

const f13 =  ({ [sym]: string }: O) => { };
function f14 ({ [sym]: string }: O) { };


//// [renamingDestructuredPropertyInFunctionType3.js]
const sym = Symbol();
const f13 = ({ [sym]: string }) => { };
function f14({ [sym]: string }) { }
;
