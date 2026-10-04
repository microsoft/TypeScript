// @target: es2015

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
