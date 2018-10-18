interface A<T> {
    // comment1
    readonly prop?: T;
    // comment2
    method(): void;
    // comment3
    new <T>(): A<T>;
    // comment4
    <T>(): A<T>;
}
// comment5
type B = number | string | object;
type C = A<number> & {
    x: string;
}; // comment6
// comment7
enum E1 {
    // comment8
    first
}
const enum E2 {
    second
}
// comment9
console.log(1 + 2);
// comment10
function functionWithDefaultArgValue(argument: string = "defaultValue"): void { }
