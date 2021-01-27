//// [privateNameAccessorsAccess.ts]
class A2 {
    get #prop() { return ""; }
    set #prop(param: string) { }

    constructor() {
        console.log(this.#prop);
        let a: A2 = this;
        a.#prop;
        function  foo (){
            a.#prop;
        }
    }
}
new A2().#prop; // Error

function  foo (){
    new A2().#prop; // Error
}

class B2 {
    m() {
        new A2().#prop;
    }
}


//// [privateNameAccessorsAccess.js]
var __classPrivateAccessorGet = (this && this.__classPrivateAccessorGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private accessor on non-instance");
    }
    return fn.call(receiver);
};
var _A2_prop_get, _A2_prop_set, _A2_instances;
class A2 {
    constructor() {
        _A2_instances.add(this);
        console.log(__classPrivateAccessorGet(this, _A2_instances, _A2_prop_get));
        let a = this;
        __classPrivateAccessorGet(a, _A2_instances, _A2_prop_get);
        function foo() {
            __classPrivateAccessorGet(a, _A2_instances, _A2_prop_get);
        }
    }
}
_A2_instances = new WeakSet(), _A2_prop_get = function _A2_prop_get() { return ""; }, _A2_prop_set = function _A2_prop_set(param) { };
new A2().; // Error
function foo() {
    new A2().; // Error
}
class B2 {
    m() {
        new A2().;
    }
}
