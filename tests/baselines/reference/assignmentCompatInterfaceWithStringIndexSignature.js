//// [assignmentCompatInterfaceWithStringIndexSignature.js]
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.Boz = function () {
    };
    return Foo;
})();

function Biz(map) {
}

Biz(new Foo());
