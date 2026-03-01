/// <reference path='fourslash.ts' />

// @Filename: /add.ts
////

// @Filename: /a.ts
////function add(x: number, y: number): number;
////[|function add(x: string, y: string): string;
////function add(x: any, y: any) {
////    return x + y;
////}|]

verify.moveToFile({
    newFileContents: {
        "/a.ts": "",
        "/add.ts":
`
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any) {
    return x + y;
}
`
    },
    interactiveRefactorArguments: { targetFile: "/add.ts" },
});
