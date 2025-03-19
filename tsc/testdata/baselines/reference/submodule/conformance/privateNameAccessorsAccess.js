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
class A2 {
    get #prop() { return ""; }
    set #prop(param) { }
    constructor() {
        console.log(this.#prop);
        let a = this;
        a.#prop;
        function foo() {
            a.#prop;
        }
    }
}
new A2().#prop; // Error
function foo() {
    new A2().#prop; // Error
}
class B2 {
    m() {
        new A2().#prop;
    }
}
