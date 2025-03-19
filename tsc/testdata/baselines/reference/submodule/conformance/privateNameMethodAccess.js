//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodAccess.ts] ////

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
class A2 {
    #method() { return ""; }
    constructor() {
        console.log(this.#method);
        let a = this;
        a.#method();
        function foo() {
            a.#method();
        }
    }
}
new A2().#method(); // Error
function foo() {
    new A2().#method(); // Error
}
class B2 {
    m() {
        new A2().#method();
    }
}
