//// [tests/cases/conformance/classes/members/privateNames/privateNameAccessorsAccess.ts] ////

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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A2_instances, _A2_prop_get, _A2_prop_set;
class A2 {
    constructor() {
        _A2_instances.add(this);
        console.log(__classPrivateFieldGet(this, _A2_instances, "a", _A2_prop_get));
        let a = this;
        __classPrivateFieldGet(a, _A2_instances, "a", _A2_prop_get);
        function foo() {
            __classPrivateFieldGet(a, _A2_instances, "a", _A2_prop_get);
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
