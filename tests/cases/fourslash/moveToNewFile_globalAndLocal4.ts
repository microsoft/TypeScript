/// <reference path="fourslash.ts" />

// @Filename: /src/globals.d.ts
//// export {}; // Make this a module
//// declare global {
////     interface Disposable {
////         [Symbol.dispose](): void;
////     }
//// }

// @Filename: /src/test.ts
//// export interface [|EditingService|] extends Disposable { }

// @Filename: /src/lifecycle.ts
//// export interface Disposable {
//// 	(): string;
//// }

verify.moveToNewFile({
    newFileContents: {
        "/src/test.ts": ``,
        "/src/EditingService.ts": // Reference to Disposable is still global
`export interface EditingService extends Disposable { }
`
}});
