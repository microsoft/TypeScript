//// [tests/cases/conformance/controlFlow/definiteAssignmentAssertionsWithObjectShortHand.ts] ////

//// [definiteAssignmentAssertionsWithObjectShortHand.ts]
const a: string | undefined = 'ff';
const foo = { a! }

const bar = {
    a ? () { }
}

//// [definiteAssignmentAssertionsWithObjectShortHand.js]
const a = 'ff';
const foo = { a };
const bar = {
    a() { }
};
