// @target: es2015
// @strict: false
declare namespace string {
    interface X { }
    export function foo(s: string);
}
string.foo("abc");
var x: string.X;
