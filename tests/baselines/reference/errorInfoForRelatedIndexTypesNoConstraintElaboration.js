//// [tests/cases/compiler/errorInfoForRelatedIndexTypesNoConstraintElaboration.ts] ////

//// [errorInfoForRelatedIndexTypesNoConstraintElaboration.ts]
/// <reference path="/.lib/react16.d.ts" />

class I<T1 extends keyof JSX.IntrinsicElements, T2 extends keyof JSX.IntrinsicElements> {
    M() {
        let c1: JSX.IntrinsicElements[T1] = {};
        const c2: JSX.IntrinsicElements[T2] = c1;
    }
}

//// [errorInfoForRelatedIndexTypesNoConstraintElaboration.js]
/// <reference path="react16.d.ts" />
var I = /** @class */ (function () {
    function I() {
    }
    I.prototype.M = function () {
        var c1 = {};
        var c2 = c1;
    };
    return I;
}());
