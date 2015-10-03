// @target: es5
function foo() {
    console.log("Call foo()");
    return { 0: 2 };
}
var result_foo1 = foo()[0] **= foo()[0];

var result_foo2 = foo()[0] **= foo()[0] **= 2;

var result_foo3 = foo()[0] **= foo()[0] ** 2;