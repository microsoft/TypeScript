//// [tests/cases/compiler/subtypeRelationForNever.ts] ////

//// [subtypeRelationForNever.ts]
function fail(message: string) : never { throw new Error(message); }
function withFew<a, r>(values: a[], haveFew: (values: a[]) => r, haveNone: (reason: string) => r): r {
    return values.length > 0 ? haveFew(values) : haveNone('No values.');
}
function id<a>(value: a) : a { return value; }
const result = withFew([1, 2, 3], id, fail); // expected result is number[]


//// [subtypeRelationForNever.js]
function fail(message) { throw new Error(message); }
function withFew(values, haveFew, haveNone) {
    return values.length > 0 ? haveFew(values) : haveNone('No values.');
}
function id(value) { return value; }
var result = withFew([1, 2, 3], id, fail); // expected result is number[]
