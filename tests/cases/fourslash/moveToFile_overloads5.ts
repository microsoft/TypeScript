/// <reference path='fourslash.ts' />

// @Filename: /add.ts
////

// @Filename: /a.ts
////function add(x: number, y: number): number;
////[|function add(x: string, y: string): string;
////function add(x: any, y: any) {
////    return x + y;
////}|]
////export const a = add();

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`import { add } from "./add";

export const a = add();`,
        "/add.ts":
`
export function add(x: number, y: number): number;
export function add(x: string, y: string): string;
export function add(x: any, y: any) {
    return x + y;
}
`
    },
    interactiveRefactorArguments: { targetFile: "/add.ts" },
});
