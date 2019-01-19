// @strict: true
interface Options {
    m(x: number): void;
    [key: string]: unknown;
}
declare function f(options: number | Options): void;
f({
    m(x) { },
});