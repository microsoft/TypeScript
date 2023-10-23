//// [tests/cases/conformance/es6/Symbols/symbolProperty59.ts] ////

//// [symbolProperty59.ts]
interface I {
    [Symbol.keyFor]: string;
}

/// [Declarations] ////



//// [/.src/symbolProperty59.d.ts]
interface I {
    [Symbol.keyFor]: string;
}
