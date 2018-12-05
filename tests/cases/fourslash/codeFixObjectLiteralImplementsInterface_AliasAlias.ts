/// <reference path='fourslash.ts' />

//// interface X { x: string; }
//// interface Y { y: number; }
//// type alias = X & Y
//// type nestedAlias = alias
//// interface foo {
////     z: nestedAlias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface X { x: string; }
interface Y { y: number; }
type alias = X & Y
type nestedAlias = alias
interface foo {
    z: nestedAlias;
}

let n: foo = {
    z: {
        x: "",
        y: 0
    },
}`,
});
