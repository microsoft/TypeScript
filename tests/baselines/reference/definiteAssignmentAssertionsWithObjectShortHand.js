//// [tests/cases/conformance/controlFlow/definiteAssignmentAssertionsWithObjectShortHand.ts] ////

//// [definiteAssignmentAssertionsWithObjectShortHand.ts]
const a: string | undefined = 'ff';
const foo = { a! }

const bar = {
    a ? () { }
}

//// [definiteAssignmentAssertionsWithObjectShortHand.js]
"use strict";
const a = 'ff';
const foo = { a };
const bar = {
    a() { }
};


//// [definiteAssignmentAssertionsWithObjectShortHand.d.ts]
declare const a: string | undefined;
declare const foo: {
    a: string;
};
declare const bar: {
    a?(): void;
};
