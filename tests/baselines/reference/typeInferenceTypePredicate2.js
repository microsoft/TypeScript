//// [typeInferenceTypePredicate2.ts]
[true, true, false, null]
    .filter((thing): thing is boolean => thing !== null)
    .map(thing => thing.toString());


//// [typeInferenceTypePredicate2.js]
[true, true, false, null]
    .filter(function (thing) { return thing !== null; })
    .map(function (thing) { return thing.toString(); });
