/// <reference path='fourslash.ts' />


////interface I { x: number; }
////new class implements I {};

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I { x: number; }
new class implements I {
    x: number;
};`,
});
