//// [commaOperatorOtherInvalidOperation.js]
//Expect to have compiler errors
//Comma operator in fuction arguments and return
function foo(x, y) {
    return x, y;
}
var resultIsString = foo(1, "123");

//TypeParameters
function foo1() {
    var x;
    var y;
    var result = (x, y);
}
