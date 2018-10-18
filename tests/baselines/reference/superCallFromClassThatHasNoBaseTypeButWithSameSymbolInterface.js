//// [superCallFromClassThatHasNoBaseTypeButWithSameSymbolInterface.ts]
interface Foo extends Array<number> {}

class Foo {
    constructor() {
        super(); // error
    }
}


//// [superCallFromClassThatHasNoBaseTypeButWithSameSymbolInterface.js]
var Foo = /** @class */ (function () {
    function Foo() {
        _this = _super.call(this) || this; // error
    }
    return Foo;
}());
