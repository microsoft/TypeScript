/// <reference path='fourslash.ts' />

//// class Bar<T>{ method(a:T): void{a;}}
//// interface foo {
////     x: Bar<Number>;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`class Bar<T>{ method(a:T): void{a;}}
interface foo {
    x: Bar<Number>;
}

let n: foo = {
    x: new Bar<Number>(),
}`,
});