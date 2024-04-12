//// [tests/cases/compiler/inferenceOuterResultNotIncorrectlyInstantiatedWithInnerResult.ts] ////

//// [inferenceOuterResultNotIncorrectlyInstantiatedWithInnerResult.ts]
// simple example
export class Test<A, B> {
    constructor(public a: A, public b: B) { }

    test<C>(c: C): Test<B, C> {
        return new Test(this.b, c);
    }
}

// complicated one
interface Supervisor<out T> {
    zip<A>(right: Supervisor<A>): Supervisor<[T, A]>;
}

export class Zip<out T0, out T1> implements Supervisor<readonly [T0, T1]> {
    constructor(
        readonly left: Supervisor<T0>,
        readonly right: Supervisor<T1>,
    ) { }

    zip<A>(right: Supervisor<A>): Supervisor<[[T0, T1], A]> {
        return new Zip(this, right);
    }
}

//// [inferenceOuterResultNotIncorrectlyInstantiatedWithInnerResult.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zip = exports.Test = void 0;
// simple example
var Test = /** @class */ (function () {
    function Test(a, b) {
        this.a = a;
        this.b = b;
    }
    Test.prototype.test = function (c) {
        return new Test(this.b, c);
    };
    return Test;
}());
exports.Test = Test;
var Zip = /** @class */ (function () {
    function Zip(left, right) {
        this.left = left;
        this.right = right;
    }
    Zip.prototype.zip = function (right) {
        return new Zip(this, right);
    };
    return Zip;
}());
exports.Zip = Zip;
