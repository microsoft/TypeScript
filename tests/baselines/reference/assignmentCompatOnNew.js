//// [assignmentCompatOnNew.ts]
class Foo{};

function bar(x: {new(): Foo;}){}

bar(Foo); // Error, but should be allowed


//// [assignmentCompatOnNew.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
;
function bar(x) { }
bar(Foo); // Error, but should be allowed
