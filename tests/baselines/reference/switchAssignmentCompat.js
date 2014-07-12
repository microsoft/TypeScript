//// [switchAssignmentCompat.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

switch (0) {
    case Foo:
        break;
}
