//// [targetTypeTest3.js]
// Test target typing for array literals and call expressions
var a = [1, 2, "3"];

function func1(stuff) {
    return stuff;
}

function func2(stuff1, stuff2, stuff3) {
    return func1([stuff1, stuff2, stuff3]);
}
