/// <reference path="fourslash.ts" />

// @filename: a.d.ts
//// declare function foo(x?: number): void;

// @filename: b.d.ts
//// declare function foo(x?: string): void;
//// declare function foo(x?: boolean): void;

// @filename: main.ts
//// function bar() {
////     /**/foo();
//// }

goTo.marker();
verify.baselineCallHierarchy();
