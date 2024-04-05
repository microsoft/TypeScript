//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticAccessorsAccess.ts] ////

//// [privateNameStaticAccessorsAccess.ts]
export {}
class A2 {
    static get #prop() { return ""; }
    static set #prop(param: string) { }

    constructor() {
        console.log(A2.#prop);
        let a: typeof A2 = A2;
        a.#prop;
        function  foo (){
            a.#prop;
        }
    }
}

A2.#prop; // Error

function  foo (){
    A2.#prop; // Error
}

class B2 {
    m() {
        A2.#prop;
    }
}


//// [privateNameStaticAccessorsAccess.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A2_prop_get, _A2_prop_set;
class A2 {
    constructor() {
        console.log(__classPrivateFieldGet(_a, _a, "a", _A2_prop_get));
        let a = _a;
        __classPrivateFieldGet(a, _a, "a", _A2_prop_get);
        function foo() {
            __classPrivateFieldGet(a, _a, "a", _A2_prop_get);
        }
    }
}
_a = A2, _A2_prop_get = function _A2_prop_get() { return ""; }, _A2_prop_set = function _A2_prop_set(param) { };
A2.; // Error
function foo() {
    A2.; // Error
}
class B2 {
    m() {
        A2.;
    }
}
export {};
