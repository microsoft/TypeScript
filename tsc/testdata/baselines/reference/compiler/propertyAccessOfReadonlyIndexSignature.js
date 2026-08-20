//// [tests/cases/compiler/propertyAccessOfReadonlyIndexSignature.ts] ////

//// [propertyAccessOfReadonlyIndexSignature.ts]
interface Test {
    readonly [key: string]: string;
}

declare var a: Test;
a.foo = 'baz';


//// [propertyAccessOfReadonlyIndexSignature.js]
"use strict";
a.foo = 'baz';
