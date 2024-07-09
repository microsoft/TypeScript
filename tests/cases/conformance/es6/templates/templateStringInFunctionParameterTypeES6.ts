// @target: ES6
function f(`hello`);
function f(x: string);
function f(x: string) {
    return x;
}