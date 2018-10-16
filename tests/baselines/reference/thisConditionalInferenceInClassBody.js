//// [thisConditionalInferenceInClassBody.ts]
type Wrapped<T> = { ___secret: T };
type Unwrap<T> = T extends Wrapped<infer U> ? U : T;

declare function set<T, K extends keyof T>(obj: T, key: K, value: Unwrap<T[K]>): Unwrap<T[K]>;

class Foo {
    prop: Wrapped<string>;

    method() {
        set(this, 'prop', 'hi'); // <-- type error
    }
}

set(new Foo(), 'prop', 'hi'); // <-- typechecks

//// [thisConditionalInferenceInClassBody.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.method = function () {
        set(this, 'prop', 'hi'); // <-- type error
    };
    return Foo;
}());
set(new Foo(), 'prop', 'hi'); // <-- typechecks
