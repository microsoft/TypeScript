//// [tests/cases/compiler/moduleKeywordSkipLibCheck.ts] ////

//// [decl.d.ts]
declare module Foo {
    export function bar(): void;
}

//// [main.ts]
Foo.bar();


//// [main.js]
"use strict";
Foo.bar();
