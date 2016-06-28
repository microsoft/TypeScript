//// [switchAssignmentCompat.ts]
class Foo { }

switch (0) {
    case Foo: break; // Error expected
}


//// [switchAssignmentCompat.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
switch (0) {
    case Foo: break; // Error expected
}
