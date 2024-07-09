/// <reference path='fourslash.ts' />

////export declare function foo<T extends { a?: /*a*/T/*b*/ }>(): void;

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type", "Extract to type alias");
