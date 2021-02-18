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
var __classStaticPrivateAccessorGet = (this && this.__classStaticPrivateAccessorGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn.call(receiver);
};
var _A2_prop_get, _A2_prop_set;
class A2 {
    constructor() {
        console.log(__classStaticPrivateAccessorGet(A2, A2, _A2_prop_get));
        let a = A2;
        __classStaticPrivateAccessorGet(a, A2, _A2_prop_get);
        function foo() {
            __classStaticPrivateAccessorGet(a, A2, _A2_prop_get);
        }
    }
}
_A2_prop_get = function _A2_prop_get() { return ""; }, _A2_prop_set = function _A2_prop_set(param) { };
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
