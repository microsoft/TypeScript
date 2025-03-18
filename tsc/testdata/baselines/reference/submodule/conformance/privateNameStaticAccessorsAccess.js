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
class A2 {
    static get #prop() { return ""; }
    static set #prop(param) { }
    constructor() {
        console.log(A2.#prop);
        let a = A2;
        a.#prop;
        function foo() {
            a.#prop;
        }
    }
}
A2.#prop;
function foo() {
    A2.#prop;
}
class B2 {
    m() {
        A2.#prop;
    }
}
export {};
