//// [tests/cases/compiler/extendConstructSignatureInInterface.ts] ////

//// [extendConstructSignatureInInterface.ts]
interface C {
    new(x: number): C;
}

var CStatic: C;
class E extends CStatic {
}

var e: E = new E(1);


//// [extendConstructSignatureInInterface.js]
var CStatic;
class E extends CStatic {
}
var e = new E(1);
