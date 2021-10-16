//// [commaOperatorOtherInvalidOperation.ts]
//Expect to have compiler errors
//Comma operator in function arguments and return
function foo(x: number, y: string) {
    return x, y;
}
var resultIsString: number = foo(1, "123"); //error here

//TypeParameters
function foo1<T1, T2>() {
    var x: T1;
    var y: T2;
    var result: T1 = (x, y); //error here
}

//// [commaOperatorOtherInvalidOperation.js]
//Expect to have compiler errors
//Comma operator in function arguments and return
function foo(x, y) {
    return x, y;
}
var resultIsString = foo(1, "123"); //error here
//TypeParameters
function foo1() {
    var x;
    var y;
    var result = (x, y); //error here
}
