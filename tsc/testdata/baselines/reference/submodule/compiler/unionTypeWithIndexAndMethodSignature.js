//// [tests/cases/compiler/unionTypeWithIndexAndMethodSignature.ts] ////

//// [unionTypeWithIndexAndMethodSignature.ts]
interface Options {
    m(x: number): void;
    [key: string]: unknown;
}
declare function f(options: number | Options): void;
f({
    m(x) { },
});

//// [unionTypeWithIndexAndMethodSignature.js]
f({
    m(x) { },
});
