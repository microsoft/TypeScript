// @lib: es6
declare function hasOwnProperty<P extends PropertyKey>(target: {}, property: P): target is { [K in P]: unknown };
declare const arrayLikeOrIterable: ArrayLike<any> | Iterable<any>;
if (hasOwnProperty(arrayLikeOrIterable, 'length')) {
    let x: number = arrayLikeOrIterable.length;
}