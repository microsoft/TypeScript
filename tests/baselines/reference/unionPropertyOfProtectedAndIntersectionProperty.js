//// [tests/cases/compiler/unionPropertyOfProtectedAndIntersectionProperty.ts] ////

//// [unionPropertyOfProtectedAndIntersectionProperty.ts]
class Foo {
  protected foo = 0;
}

class Bar {
  protected foo = 0;
}

type Nothing<V extends Foo> = void;

type Broken<V extends Array<Foo | Bar>> = {
  readonly [P in keyof V]: V[P] extends Foo ? Nothing<V[P]> : never;
};

// The issue above, #49517, is fixed very indirectly. Here's some code
// that shows the direct result of the change:

type _3 = (Foo & Bar)['foo'];         // Ok
type _4 = (Foo | Bar)['foo'];         // Error
type _5 = (Foo | (Foo & Bar))['foo']; // Prev error, now ok

// V[P] in `Nothing<V[P]>` is the substitution type `V[P] & Foo`. When
// checking if that's assignable to `Foo` in the constraint of `Nothing`,
// it passes the regular assignability check but then goes into intersection
// property checks. To pull `foo` from the substitution type, it gets the
// apparent type, which turns out to be something like `(Foo & Foo') | (Foo & Bar)`
// where `Foo` and `Foo'` are different this-type instantiations of `Foo`.
// Those two instantiations have the same `foo` property, but then `(Foo & Bar)['foo']`
// is a synthesized intersection property with a declaration in `Foo` and a
// declaration in `Bar`. Because the former was marked as protected and the
// latter was a different symbol, we previously thought the two symbols were
// totally unrelated, as in `(Foo | Bar)['foo']`. The fix I implemented is to
// check not that the two property symbols are identical, but that they share
// some common declaration. The change is directly observable by seeing whether
// `(Foo | (Foo & Bar))['foo']` is allowed.


//// [unionPropertyOfProtectedAndIntersectionProperty.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.foo = 0;
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
        this.foo = 0;
    }
    return Bar;
}());
// V[P] in `Nothing<V[P]>` is the substitution type `V[P] & Foo`. When
// checking if that's assignable to `Foo` in the constraint of `Nothing`,
// it passes the regular assignability check but then goes into intersection
// property checks. To pull `foo` from the substitution type, it gets the
// apparent type, which turns out to be something like `(Foo & Foo') | (Foo & Bar)`
// where `Foo` and `Foo'` are different this-type instantiations of `Foo`.
// Those two instantiations have the same `foo` property, but then `(Foo & Bar)['foo']`
// is a synthesized intersection property with a declaration in `Foo` and a
// declaration in `Bar`. Because the former was marked as protected and the
// latter was a different symbol, we previously thought the two symbols were
// totally unrelated, as in `(Foo | Bar)['foo']`. The fix I implemented is to
// check not that the two property symbols are identical, but that they share
// some common declaration. The change is directly observable by seeing whether
// `(Foo | (Foo & Bar))['foo']` is allowed.
