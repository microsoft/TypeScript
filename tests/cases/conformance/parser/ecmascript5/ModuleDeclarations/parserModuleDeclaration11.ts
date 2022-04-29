declare module string {
    interface X { }
    export function foo(s: string);
}
string.foo("abc");
var x: string.X;
