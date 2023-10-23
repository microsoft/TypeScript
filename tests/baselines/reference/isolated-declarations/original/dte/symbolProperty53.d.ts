//// [tests/cases/conformance/es6/Symbols/symbolProperty53.ts] ////

//// [symbolProperty53.ts]
var obj = {
    [Symbol.for]: 0
};

obj[Symbol.for];

/// [Declarations] ////



//// [/.src/symbolProperty53.d.ts]
declare var obj: {
    [Symbol.for]: number;
};
