//// [tests/cases/conformance/controlFlow/definiteAssignmentAssertionsWithObjectShortHand.ts] ////

//// [definiteAssignmentAssertionsWithObjectShortHand.ts]
const a: string | undefined = 'ff';
const foo: {
    a: string;
} = { a! }

const bar = {
    a ? (): void { }
}

/// [Declarations] ////



//// [definiteAssignmentAssertionsWithObjectShortHand.d.ts]
declare const a: string | undefined;
declare const foo: {
    a: string;
};
declare const bar: {
    a(): void;
};
//# sourceMappingURL=definiteAssignmentAssertionsWithObjectShortHand.d.ts.map
/// [Errors] ////

definiteAssignmentAssertionsWithObjectShortHand.ts(4,8): error TS1255: A definite assignment assertion '!' is not permitted in this context.
definiteAssignmentAssertionsWithObjectShortHand.ts(7,7): error TS1162: An object member cannot be declared optional.


==== definiteAssignmentAssertionsWithObjectShortHand.ts (2 errors) ====
    const a: string | undefined = 'ff';
    const foo: {
        a: string;
    } = { a! }
           ~
!!! error TS1255: A definite assignment assertion '!' is not permitted in this context.
    
    const bar = {
        a ? (): void { }
          ~
!!! error TS1162: An object member cannot be declared optional.
    }