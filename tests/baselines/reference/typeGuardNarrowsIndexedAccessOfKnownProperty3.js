//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty3.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty3.ts]
type Foo = (number | undefined)[] | undefined;

const foo: Foo = [1, 2, 3];
const index = 1;

if (foo !== undefined && foo[index] !== undefined && foo[index] >= 0) {
    foo[index] // number
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty3.js]
"use strict";
var foo = [1, 2, 3];
var index = 1;
if (foo !== undefined && foo[index] !== undefined && foo[index] >= 0) {
    foo[index]; // number
}
