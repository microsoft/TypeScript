//// [interfaceExtendingClassWithPrivates.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

var i;
var r = i.y;
var r2 = i.x; // error
