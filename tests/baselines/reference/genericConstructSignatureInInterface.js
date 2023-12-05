//// [tests/cases/compiler/genericConstructSignatureInInterface.ts] ////

//// [genericConstructSignatureInInterface.ts]
interface C {
    new <T>(x: T);
}

var v: C;
var r = new v<number>(1);

//// [genericConstructSignatureInInterface.js]
var v;
var r = new v(1);
