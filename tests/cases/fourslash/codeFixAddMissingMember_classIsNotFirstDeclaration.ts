/// <reference path='fourslash.ts' />

////interface C {}
////class C {
////}
////new C().x = 0;

verify.codeFix({
    description: "Declare property 'x'",
    index: 0,
    newFileContent:
`interface C {}
class C {
    x: number;
}
new C().x = 0;`,
});
