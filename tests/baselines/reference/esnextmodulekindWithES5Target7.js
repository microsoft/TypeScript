//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target7.ts] ////

//// [esnextmodulekindWithES5Target7.ts]
export namespace N {
    var x = 0;
}

export namespace N2 {
    export interface I { }
}


//// [esnextmodulekindWithES5Target7.js]
export var N;
(function (N) {
    var x = 0;
})(N || (N = {}));
