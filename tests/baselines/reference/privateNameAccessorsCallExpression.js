//// [privateNameAccessorsCallExpression.ts]
class A {
    get #fieldFunc() {  return function() { this.x = 10; } }
    get #fieldFunc2() { return  function(a, ...b) {}; }
    x = 1;
    test() {
        this.#fieldFunc();
        const func = this.#fieldFunc;
        func();
        new this.#fieldFunc();

        const arr = [ 1, 2 ];
        this.#fieldFunc2(0, ...arr, 3);
        const b = new this.#fieldFunc2(0, ...arr, 3);
        const str = this.#fieldFunc2`head${1}middle${2}tail`;
        this.getInstance().#fieldFunc2`test${1}and${2}`;
    }
    getInstance() { return new A(); }
}

tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(10,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(11,27): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(13,18): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(15,14): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(16,28): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(17,26): error TS1003: Identifier expected.
tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js(18,35): error TS1003: Identifier expected.


==== tests/cases/conformance/classes/members/privateNames/privateNameAccessorsCallExpression.js (7 errors) ====
    var _fieldFunc, _fieldFunc2;
    class A {
        constructor() {
            this.x = 1;
        }
        get () { return function () { this.x = 10; }; }
        get () { return function (a, ...b) { }; }
        test() {
            var _a;
            this..call(this);
                 ~
!!! error TS1003: Identifier expected.
            const func = this.;
                              ~
!!! error TS1003: Identifier expected.
            func();
            new this.();
                     ~
!!! error TS1003: Identifier expected.
            const arr = [1, 2];
            this..call(this, 0, ...arr, 3);
                 ~
!!! error TS1003: Identifier expected.
            const b = new this.(0, ...arr, 3);
                               ~
!!! error TS1003: Identifier expected.
            const str = this..bind(this) `head${1}middle${2}tail`;
                             ~
!!! error TS1003: Identifier expected.
            (_a = this.getInstance())..bind(_a) `test${1}and${2}`;
                                      ~
!!! error TS1003: Identifier expected.
        }
        getInstance() { return new A(); }
    }
    