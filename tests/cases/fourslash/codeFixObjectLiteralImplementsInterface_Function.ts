/// <reference path='fourslash.ts' />

//// interface foo {
////     bar(x: number, y: string): boolean;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface foo {
    bar(x: number, y: string): boolean;
}
let n: foo = {
    bar(x: number, y: string): boolean {
        throw new Error("Method not implemented.");
    },
}`,
});