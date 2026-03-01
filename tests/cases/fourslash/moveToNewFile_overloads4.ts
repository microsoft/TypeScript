/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////function add(x: number, y: number): number;
////[|function add(x: string, y: string): string;
////function add(x: any, y: any) {
////    return x + y;
////}|]
////function remove() {}

verify.moveToNewFile({
    newFileContents: {
        "/a.ts": "function remove() {}",
        "/add.ts":
`function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any) {
    return x + y;
}
`
    },
});
