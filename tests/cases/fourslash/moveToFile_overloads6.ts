/// <reference path='fourslash.ts' />

// @Filename: /add.ts
////const x = 20;

// @Filename: /a.ts
//// [|export function add(a: number, b: number): number;
//// export function add(a: string, b: string): string;
//// export function add(a: any, b: any): any {
////     multiply(2,3);
////   return a + b;
//// }|]
//
//// function multiply(x: number, y: number): number;
//// function multiply(x: string, y: string): string;
//// function multiply(x: any, y: any) {
////    return x + y;
//// }

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`export function multiply(x: number, y: number): number;
export function multiply(x: string, y: string): string;
export function multiply(x: any, y: any) {
   return x + y;
}`,

        "/add.ts":
`import { multiply } from "./a";

const x = 20;
export function add(a: number, b: number): number;
export function add(a: string, b: string): string;
export function add(a: any, b: any): any {
    multiply(2, 3);
    return a + b;
}
`
    },
    interactiveRefactorArguments: { targetFile: "/add.ts" },
});
