/// <reference path='fourslash.ts' />

//// class C {}
//// const x: number = new C().x;

verify.codeFix({
    description: "Declare property 'x'",
    index: 0,
    newFileContent:
`class C {
    x: number;
}
const x: number = new C().x;`
});
