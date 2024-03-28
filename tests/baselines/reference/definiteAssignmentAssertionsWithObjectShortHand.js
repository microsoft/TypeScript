//// [tests/cases/conformance/controlFlow/definiteAssignmentAssertionsWithObjectShortHand.ts] ////

//// [definiteAssignmentAssertionsWithObjectShortHand.ts]
const a: string | undefined = 'ff';
const foo = { a! }

const bar = {
    a ? () { }
}

//// [definiteAssignmentAssertionsWithObjectShortHand.js]
"use strict";
var a = 'ff';
var foo = { a: a };
var bar = {
    a: function () { }
};


//// [definiteAssignmentAssertionsWithObjectShortHand.d.ts]
declare const a: string | undefined;
declare const foo: {
    a: string;
};
declare const bar: {
    a?(): void;
};
