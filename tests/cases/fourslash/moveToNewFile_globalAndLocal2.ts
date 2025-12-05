/// <reference path="fourslash.ts" />

// @Filename: /src/globals.d.ts
//// export {}; // Make this a module
//// declare global {
////     interface Disposable {
////         [Symbol.dispose](): void;
////     }
//// }

// @Filename: /src/test.ts
//// [|export interface Disposable {
////     (): string;
//// }
//// export interface EditingService extends Disposable { }|]


verify.moveToNewFile({
    newFileContents: {
        "/src/test.ts": 
``,
        "/src/Disposable.ts":  // Reference to Disposable is moved to new file from `test.ts`
`export interface Disposable {
    (): string;
}
export interface EditingService extends Disposable { }
`
}});
