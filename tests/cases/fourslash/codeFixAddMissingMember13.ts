/// <reference path='fourslash.ts' />

//// class C {}
//// const x: number = new C().x;

verify.codeFix({
    description: "Add index signature for property 'x'",
    index: 1,
    newFileContent:
`class C {
    [x: string]: number;
}
const x: number = new C().x;`
});
