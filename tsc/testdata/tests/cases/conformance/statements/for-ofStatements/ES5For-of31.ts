// @target: es5, es2015
var a: string, b: number;

for ({ a: b = 1, b: a = ""} of []) {
    a;
    b;
}