//// [privateNameMethodCallExpression.ts]
class AA {
    #method() { this.x = 10; };
    #method2(a, ...b) {};
    x = 1;
    test() {
        this.#method();
        const func = this.#method;
        func();
        new this.#method();

        const arr = [ 1, 2 ];
        this.#method2(0, ...arr, 3);

        const b = new this.#method2(0, ...arr, 3); //Error 
        const str = this.#method2`head${1}middle${2}tail`;
        this.getInstance().#method2`test${1}and${2}`;

        this.getInstance().#method2(0, ...arr, 3); 
        const b2 = new (this.getInstance().#method2)(0, ...arr, 3); //Error 
        const str2 = this.getInstance().#method2`head${1}middle${2}tail`;
    }
    getInstance() { return new AA(); }
}


tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js(12,5): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js(12,8): error TS1005: '=>' expected.
tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js(14,15): error TS1005: '=>' expected.
tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js(16,12): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js(31,19): error TS1005: ';' expected.
tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js(32,1): error TS1128: Declaration or statement expected.


==== tests/cases/conformance/classes/members/privateNames/privateNameMethodCallExpression.js (6 errors) ====
    var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };
    var _method, _method2;
    class AA {
        constructor() {
            this.x = 1;
        }
        () { this.x = 10; }
        ~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
           ~
!!! error TS1005: '=>' expected.
        ;
        (a, ...b) { }
                  ~
!!! error TS1005: '=>' expected.
        ;
        test() {
               ~
!!! error TS1005: ';' expected.
            var _a, _b, _c;
            __classPrivateFieldGet(this, _method).call(this);
            const func = __classPrivateFieldGet(this, _method);
            func();
            new (__classPrivateFieldGet(this, _method))();
            const arr = [1, 2];
            __classPrivateFieldGet(this, _method2).call(this, 0, ...arr, 3);
            const b = new (__classPrivateFieldGet(this, _method2))(0, ...arr, 3); //Error 
            const str = __classPrivateFieldGet(this, _method2).bind(this) `head${1}middle${2}tail`;
            __classPrivateFieldGet((_a = this.getInstance()), _method2).bind(_a) `test${1}and${2}`;
            __classPrivateFieldGet((_b = this.getInstance()), _method2).call(_b, 0, ...arr, 3);
            const b2 = new (__classPrivateFieldGet(this.getInstance(), _method2))(0, ...arr, 3); //Error 
            const str2 = __classPrivateFieldGet((_c = this.getInstance()), _method2).bind(_c) `head${1}middle${2}tail`;
        }
        getInstance() { return new AA(); }
                      ~
!!! error TS1005: ';' expected.
    }
    ~
!!! error TS1128: Declaration or statement expected.
    _method = new WeakMap(), _method2 = new WeakMap();
    