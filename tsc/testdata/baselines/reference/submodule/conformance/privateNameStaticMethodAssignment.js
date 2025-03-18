//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethodAssignment.ts] ////

//// [privateNameStaticMethodAssignment.ts]
class A3 {
    static #method() { };
    constructor(a: typeof A3, b: any) {
        A3.#method = () => {} // Error, not writable 
        a.#method = () => { }; // Error, not writable 
        b.#method =  () => { } //Error, not writable 
        ({ x: A3.#method } = { x: () => {}}); //Error, not writable 
        let x = A3.#method;
        b.#method++ //Error, not writable 
    }
}


//// [privateNameStaticMethodAssignment.js]
class A3 {
    static #method() { }
    ;
    constructor(a, b) {
        A3.#method = () => { };
        a.#method = () => { };
        b.#method = () => { };
        ({ x: A3.#method } = { x: () => { } });
        let x = A3.#method;
        b.#method++;
    }
}
