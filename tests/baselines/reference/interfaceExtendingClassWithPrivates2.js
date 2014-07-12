//// [interfaceExtendingClassWithPrivates2.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

var Bar = (function () {
    function Bar() {
    }
    return Bar;
})();

var Baz = (function () {
    function Baz() {
    }
    return Baz;
})();

var i;
var r = i.z;
var r2 = i.x;
var r3 = i.y; // error
