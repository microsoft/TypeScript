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
class I {
    M() {
        let c1 = {};
        const c2 = c1;
    }
}
