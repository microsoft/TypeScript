/// <reference path="fourslash.ts" />
// @Target: ES6

////type Args = 'foo'|'bar';
////
////declare function tag<T extends readonly Args[]>(parts: TemplateStringsArray, ...args: T);
////
////tag`${ '/*1*/' }`
////tag`${ 'fo/*2*/o' }`
////tag`${ 'ba/*3*/r' }`

verify.completions(
    { marker: "1", exact: ["foo", "bar"]},
    { marker: "2", exact: ["foo"]},
    { marker: "3", exact: ["bar"]},
);
