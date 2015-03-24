// @declaration: true

var { a: x11, b: { a: y11, b: { a: z11 }}} = { a: 1, b: { a: "hello", b: { a: true } } };

function f15() {
    var a4 = "hello";
    var b4 = 1;
    var c4 = true;
    return { a4, b4, c4 };
}
var { a4, b4, c4 } = f15();

module m {
    export var { a4, b4, c4 } = f15();
}