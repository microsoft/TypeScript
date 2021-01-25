//// [privateNamesAndDecorators.ts]
declare function dec<T>(target: T): T;

class A {
    @dec                // Error
    #foo = 1;
    @dec                // Error
    #bar(): void { }
}


//// [privateNamesAndDecorators.js]
var _foo, _bar, _bar_1;
var A = /** @class */ (function () {
    function A() {
        _bar.add(this);
        _foo.set(this, 1);
    }
    return A;
}());
_foo = new WeakMap(), _bar = new WeakSet(), _bar_1 = function _bar_1() { };
