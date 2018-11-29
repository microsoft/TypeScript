/// <reference path='fourslash.ts' />

//// class Building {}
//// type alias = Building
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`class Building {}
type alias = Building
interface foo {
    x: alias;
}

let n: foo = {
    x: new Building(),
}`,
});