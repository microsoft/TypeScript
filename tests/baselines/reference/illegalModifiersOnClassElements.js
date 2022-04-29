//// [illegalModifiersOnClassElements.ts]
class C {
    declare foo = 1;
    export bar = 1;
}

//// [illegalModifiersOnClassElements.js]
var C = /** @class */ (function () {
    function C() {
        this.bar = 1;
    }
    return C;
}());
