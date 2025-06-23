/// <reference path='fourslash.ts' />

// @lib: esnext
// @target: esnext

// @Filename: /node_modules/@types/node/globals.d.ts
////export {};
////declare global {
////    interface SymbolConstructor {
////        readonly dispose: unique symbol;
////    }
////    interface Disposable {
////        [Symbol.dispose](): void;
////    }
////}

// @Filename: /node_modules/@types/node/index.d.ts
/////// <reference path="globals.d.ts" />

// @Filename: a.ts
////class Foo implements Disposable {}

goTo.file("a.ts");
verify.codeFix({
    description: "Implement interface 'Disposable'",
    newFileContent:
`class Foo implements Disposable {
    [Symbol.dispose](): void {
        throw new Error("Method not implemented.");
    }
}`
});
