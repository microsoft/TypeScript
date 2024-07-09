/// <reference path="fourslash.ts" />

// @lib: esnext
// @allowNonTsExtensions: true

// @Filename: Foo.js
//// a.next(/**/);

goTo.marker();
verify.signatureHelp({ overloadsCount: 2, text: "Generator.next(): IteratorResult<T, TReturn>" });
