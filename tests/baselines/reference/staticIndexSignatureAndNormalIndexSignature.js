//// [staticIndexSignatureAndNormalIndexSignature.ts]
class Foo {
    [p: string]: any;
    static [p: string]: number;
}

//// [staticIndexSignatureAndNormalIndexSignature.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
