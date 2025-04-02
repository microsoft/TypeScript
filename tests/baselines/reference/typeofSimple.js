//// [tests/cases/compiler/typeofSimple.ts] ////

//// [typeofSimple.ts]
var v = 3;
var v2: typeof v;
var v3: string = v2; // Not assignment compatible

interface I<T> { x: T; }
interface J { }

var numberJ: typeof J; //Error, cannot reference type in typeof
var numberI: I<typeof v2>;

var fun: () => I<number>;
numberI = fun();

//// [typeofSimple.js]
var v = 3;
var v2;
var v3 = v2; // Not assignment compatible
var numberJ; //Error, cannot reference type in typeof
var numberI;
var fun;
numberI = fun();
