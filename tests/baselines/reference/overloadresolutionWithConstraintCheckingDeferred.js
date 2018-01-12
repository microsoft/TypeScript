//// [overloadresolutionWithConstraintCheckingDeferred.ts]
interface A { x }
interface B { x; y }
interface C { z }
interface D { q }

class G<T extends A> {
    constructor(x: T) { }
}

declare function foo(arg: (x: D) => number): string;
declare function foo(arg: (x: C) => any): string;
declare function foo(arg: (x: B) => any): number;

var result: number = foo(x => new G(x)); // x has type D, new G(x) fails, so first overload is picked.

var result2: number = foo(x => new G<typeof x>(x)); // x has type D, new G(x) fails, so first overload is picked.

var result3: string = foo(x => { // x has type D
    var y: G<typeof x>; // error that D does not satisfy constraint, y is of type G<D>, entire call to foo is an error
    return y;
});


//// [overloadresolutionWithConstraintCheckingDeferred.js]
var G = /** @class */ (function () {
    function G(x) {
    }
    return G;
}());
var result = foo(function (x) { return new G(x); }); // x has type D, new G(x) fails, so first overload is picked.
var result2 = foo(function (x) { return new G(x); }); // x has type D, new G(x) fails, so first overload is picked.
var result3 = foo(function (x) {
    var y; // error that D does not satisfy constraint, y is of type G<D>, entire call to foo is an error
    return y;
});
