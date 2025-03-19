//// [tests/cases/compiler/thisPredicateInObjectLiteral.ts] ////

//// [thisPredicateInObjectLiteral.ts]
// Should be OK
const foo2 = {
    isNumber(): this is { b: string } {
        return true;
    },
};

// Still an error
const foo3 = {
    isNumber(x: any): x is this {
        return true;
    },
};


//// [thisPredicateInObjectLiteral.js]
// Should be OK
const foo2 = {
    isNumber() {
        return true;
    },
};
// Still an error
const foo3 = {
    isNumber(x) {
        return true;
    },
};
