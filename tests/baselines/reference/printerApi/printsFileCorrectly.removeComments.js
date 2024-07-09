interface A<T> {
    readonly prop?: T;
    method(): void;
    new <T>(): A<T>;
    <T>(): A<T>;
}
type B = number | string | object;
type C = A<number> & {
    x: string;
};
enum E1 {
    first
}
const enum E2 {
    second
}
console.log(1 + 2);
function functionWithDefaultArgValue(argument: string = "defaultValue"): void { }
