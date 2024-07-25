/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////const b = 2;

// @Filename: /a.ts
////const a = 1;
////function[| add(x: number, y: number): number;
////function add(x: string, y: string): string;
////function add(x: any, y: any) {
////    return x + y;
////}
//// 
//// |]const b = 2;
////const c = 3;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`const a = 1;
 const b = 2;
const c = 3;`,

        "/bar.ts":
`const b = 2;
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any) {
    return x + y;
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
