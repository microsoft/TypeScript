/// <reference path='fourslash.ts' />

//// interface foo {
////     x: number;
//// }
//// function bar (a: number, b: boolean, c: foo, d: string){a; b; c; d;}
////
//// bar(42, true, {}, "foobaroo");

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    x: number;
}
function bar (a: number, b: boolean, c: foo, d: string){a; b; c; d;}

bar(42, true, {
    x: 0,
}, "foobaroo");`,
});