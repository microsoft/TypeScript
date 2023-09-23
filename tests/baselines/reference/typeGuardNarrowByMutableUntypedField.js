//// [tests/cases/compiler/typeGuardNarrowByMutableUntypedField.ts] ////

//// [typeGuardNarrowByMutableUntypedField.ts]
declare function hasOwnProperty<P extends PropertyKey>(target: {}, property: P): target is { [K in P]: unknown };
declare const arrayLikeOrIterable: ArrayLike<any> | Iterable<any>;
if (hasOwnProperty(arrayLikeOrIterable, 'length')) {
    let x: number = arrayLikeOrIterable.length;
}

//// [typeGuardNarrowByMutableUntypedField.js]
if (hasOwnProperty(arrayLikeOrIterable, 'length')) {
    var x = arrayLikeOrIterable.length;
}
