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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _prop, _prop_1;
class A2 {
    constructor() {
        console.log(__classPrivateFieldGet(this, _prop_1));
        let a = this;
        __classPrivateFieldGet(a, _prop_1);
        function foo() {
            __classPrivateFieldGet(a, _prop_1);
        }
    }
    get () { return ""; }
    set (param) { }
}
_prop = new WeakMap(), _prop_1 = new WeakMap();
new A2().; // Error
function foo() {
    new A2().; // Error
}
class B2 {
    m() {
        new A2().;
    }
}
