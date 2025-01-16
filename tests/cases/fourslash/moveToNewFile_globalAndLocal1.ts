/// <reference path="fourslash.ts" />

// @Filename: /src/globals.d.ts
//// export {}; // Make this a module
//// declare global {
////     interface Disposable {
////         [Symbol.dispose](): void;
////     }
//// }

// @Filename: /src/test.ts
//// interface Disposable {
////     (): string;
//// }
//// export interface [|EditingService|] extends Disposable { }


verify.moveToNewFile({
    newFileContents: {
        "/src/test.ts": 
`export interface Disposable {
    (): string;
}
`,
        "/src/EditingService.ts":  // Reference to Disposable is still from test
`import { Disposable } from "./test";

export interface EditingService extends Disposable { }
`
}});
