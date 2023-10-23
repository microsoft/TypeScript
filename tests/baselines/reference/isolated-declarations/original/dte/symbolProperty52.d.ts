//// [tests/cases/conformance/es6/Symbols/symbolProperty52.ts] ////

//// [symbolProperty52.ts]
var obj = {
    [Symbol.nonsense]: 0
};

obj = {};

obj[Symbol.nonsense];

/// [Declarations] ////



//// [/.src/symbolProperty52.d.ts]
declare var obj: {
    [Symbol.nonsense]: number;
};
