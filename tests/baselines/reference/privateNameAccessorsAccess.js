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
var _prop, _prop_1;
class A2 {
    constructor() {
        console.log(this.);
        let a = this;
        a.;
        function foo() {
            a.;
        }
    }
    get () { return ""; }
    set (param) { }
}
new A2().; // Error
function foo() {
    new A2().; // Error
}
class B2 {
    m() {
        new A2().;
    }
}
