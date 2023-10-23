//// [tests/cases/conformance/es6/Symbols/symbolProperty54.ts] ////

//// [symbolProperty54.ts]
var obj = {
    [Symbol.prototype]: 0
};

/// [Declarations] ////



//// [/.src/symbolProperty54.d.ts]
declare var obj: {
    [Symbol.prototype]: number;
};
