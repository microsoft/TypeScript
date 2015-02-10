//// [computedPropertyNames42.ts]
class Foo { x }
class Foo2 { x; y }

class C {
    [s: string]: Foo2;

    // Computed properties
    [""]: Foo;
}

//// [computedPropertyNames42.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
var Foo2 = (function () {
    function Foo2() {
    }
    return Foo2;
})();
var C = (function () {
    function C() {
    }
    return C;
})();
