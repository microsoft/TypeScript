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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _A2_method, _A2_instances, _a;
class A2 {
    constructor() {
        _A2_instances.add(this);
        console.log(__classPrivateMethodGet(this, _A2_instances, _A2_method));
        let a = this;
        __classPrivateMethodGet(a, _A2_instances, _A2_method).call(a);
        function foo() {
            __classPrivateMethodGet(a, _A2_instances, _A2_method).call(a);
        }
    }
}
_A2_instances = new WeakSet(), _A2_method = function _A2_method() { return ""; };
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
