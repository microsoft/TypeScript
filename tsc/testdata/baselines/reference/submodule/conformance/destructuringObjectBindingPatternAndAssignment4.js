//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment4.ts] ////

//// [destructuringObjectBindingPatternAndAssignment4.ts]
const {
    a = 1,
    b = 2,
    c = b, // ok
    d = a, // ok
    e = f, // error
    f = f  // error
} = { } as any;


//// [destructuringObjectBindingPatternAndAssignment4.js]
const { a = 1, b = 2, c = b, d = a, e = f, f = f } = {};
