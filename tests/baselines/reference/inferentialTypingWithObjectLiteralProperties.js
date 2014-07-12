//// [inferentialTypingWithObjectLiteralProperties.js]
function f(x, y) {
    return x;
}
f({ x: [null] }, { x: [1] }).x[0] = "";
f({ x: [1] }, { x: [null] }).x[0] = "";
