//// [tests/cases/compiler/typeGuardNarrowByUntypedField.ts] ////

//// [typeGuardNarrowByUntypedField.ts]
declare function hasOwnProperty<P extends PropertyKey>(target: {}, property: P): target is { readonly [K in P]: unknown };
declare const arrayLikeOrIterable: ArrayLike<any> | Iterable<any>;
if (hasOwnProperty(arrayLikeOrIterable, 'length')) {
    let x: number = arrayLikeOrIterable.length;
}

//// [typeGuardNarrowByUntypedField.js]
if (hasOwnProperty(arrayLikeOrIterable, 'length')) {
    var x = arrayLikeOrIterable.length;
}
