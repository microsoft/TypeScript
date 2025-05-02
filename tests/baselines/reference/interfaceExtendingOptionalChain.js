//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceExtendingOptionalChain.ts] ////

//// [interfaceExtendingOptionalChain.ts]
namespace Foo {
    export class Bar {}
}

interface C1 extends Foo?.Bar {}


//// [interfaceExtendingOptionalChain.js]
var Foo;
(function (Foo) {
    var Bar = /** @class */ (function () {
        function Bar() {
        }
        return Bar;
    }());
    Foo.Bar = Bar;
})(Foo || (Foo = {}));
