//// [illegalModifiersOnClassElements.ts]
class C {
    declare foo = 1;
    export bar = 1;
}

//// [illegalModifiersOnClassElements.js]
var C = (function () {
    function C() {
        this.foo = 1;
        this.bar = 1;
    }
    return C;
}());
