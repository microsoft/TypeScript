//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndDecorators.ts] ////

//// [privateNamesAndDecorators.ts]
declare function dec<T>(target: T): T;

class A {
    @dec                // Error
    #foo = 1;
    @dec                // Error
    #bar(): void { }
}


//// [privateNamesAndDecorators.js]
var _A_instances, _A_foo, _A_bar;
var A = /** @class */ (function () {
    function A() {
        _A_instances.add(this);
        _A_foo.set(this, 1);
    }
    return A;
}());
_A_foo = new WeakMap(), _A_instances = new WeakSet(), _A_bar = function _A_bar() { };
