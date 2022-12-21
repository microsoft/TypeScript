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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A2_instances, _A2_method, _a;
class A2 {
    constructor() {
        _A2_instances.add(this);
        console.log(__classPrivateFieldGet(this, _A2_instances, "m", _A2_method));
        let a = this;
        __classPrivateFieldGet(a, _A2_instances, "m", _A2_method).call(a);
        function foo() {
            __classPrivateFieldGet(a, _A2_instances, "m", _A2_method).call(a);
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
