//// [tests/cases/compiler/typeInferenceTypePredicate2.ts] ////

//// [typeInferenceTypePredicate2.ts]
[true, true, false, null]
    .filter((thing): thing is boolean => thing !== null)
    .map(thing => thing.toString());


//// [typeInferenceTypePredicate2.js]
[true, true, false, null]
    .filter((thing) => thing !== null)
    .map(thing => thing.toString());
