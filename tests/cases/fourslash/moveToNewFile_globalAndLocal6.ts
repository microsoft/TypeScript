/// <reference path="fourslash.ts" />

// @Filename: /src/globals.d.ts
//// export {}; // Make this a module
//// declare global {
////     interface Disposable {
////         [Symbol.dispose](): void;
////     }
//// }

// @Filename: /src/test.ts
//// [|const Disposable = 1;
//// export const EditingService = Disposable;|]

verify.moveToNewFile({
    newFileContents: {
        "/src/test.ts": ``,
        "/src/Disposable.ts": // Reference to Disposable is moved from `test.ts`
`const Disposable = 1;
export const EditingService = Disposable;
`
}});
