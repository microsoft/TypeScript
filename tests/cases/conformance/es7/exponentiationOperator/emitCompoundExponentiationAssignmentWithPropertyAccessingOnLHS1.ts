// @target: es5

var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { prop: 2 };
}
foo().prop **= 2;
var result0 = foo().prop **= 2;
foo().prop **= foo().prop **= 2;
var result1 = foo().prop **= foo().prop **= 2;
foo().prop **= foo().prop ** 2;
var result2 = foo().prop **= foo().prop ** 2;