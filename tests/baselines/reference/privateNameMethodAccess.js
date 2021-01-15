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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _method, _a;
class A2 {
    constructor() {
        console.log(__classPrivateFieldGet(this, _method));
        let a = this;
        __classPrivateFieldGet(a, _method).call(a);
        function foo() {
            __classPrivateFieldGet(a, _method).call(a);
        }
    }
    () { return ""; }
}
_method = new WeakMap();
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
