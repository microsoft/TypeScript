/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////const b = 2;

// @Filename: /a.ts
////const a = 1;
////function add1(x: number, y: number): number;
////functi[|on add1(x: string, y: string): string;
////function add1(x: any, y: any) {
////    return x + y;
////}
////function foo() {}
////function add2(x: number, y: number): number;
////function add2(x: string, y: string): string;
////function add2(x: any, y: any) {
////    return x + y;
////}|]
////const c = 3;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`const a = 1;
const c = 3;`,

        "/bar.ts":
`const b = 2;
function add1(x: number, y: number): number;
function add1(x: string, y: string): string;
function add1(x: any, y: any) {
    return x + y;
}
function foo() { }
function add2(x: number, y: number): number;
function add2(x: string, y: string): string;
function add2(x: any, y: any) {
    return x + y;
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});