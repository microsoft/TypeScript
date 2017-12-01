//// [a.js]
function foo() {
    var a = 10;
    var b = "Hello";
    return {
        a,
        b
    };
}

//// [out.js]
function foo() {
    var a = 10;
    var b = "Hello";
    return {
        a: a,
        b: b
    };
}
