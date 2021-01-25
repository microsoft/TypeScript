//// [privateNameMethodAccess.ts]
class A2 {
    #method() { return "" }
    constructor() {
        console.log(this.#method);
        let a: A2 = this;
        a.#method();
        function  foo (){
            a.#method();
        }
    }
}
new A2().#method(); // Error

function  foo (){
    new A2().#method(); // Error
}

class B2 {
    m() {
        new A2().#method();
    }
}


//// [privateNameMethodAccess.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _method, _method_1, _a;
class A2 {
    constructor() {
        _method.add(this);
        console.log(__classPrivateMethodGet(this, _method, _method_1));
        let a = this;
        __classPrivateMethodGet(a, _method, _method_1).call(a);
        function foo() {
            __classPrivateMethodGet(a, _method, _method_1).call(a);
        }
    }
}
_method = new WeakSet(), _method_1 = function _method_1() { return ""; };
(_a = new A2())..call(_a); // Error
function foo() {
    var _a;
    (_a = new A2())..call(_a); // Error
}
class B2 {
    m() {
        var _a;
        (_a = new A2())..call(_a);
    }
}
