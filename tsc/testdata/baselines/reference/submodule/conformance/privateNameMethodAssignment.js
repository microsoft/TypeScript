//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodAssignment.ts] ////

//// [privateNameMethodAssignment.ts]
class A3 {
    #method() { };
    constructor(a: A3, b: any) {
        this.#method = () => {} // Error, not writable 
        a.#method = () => { }; // Error, not writable 
        b.#method =  () => { } //Error, not writable 
        ({ x: this.#method } = { x: () => {}}); //Error, not writable 
        let x = this.#method;
        b.#method++ //Error, not writable 
    }
}


//// [privateNameMethodAssignment.js]
class A3 {
    #method() { }
    ;
    constructor(a, b) {
        this.#method = () => { }; // Error, not writable 
        a.#method = () => { }; // Error, not writable 
        b.#method = () => { }; //Error, not writable 
        ({ x: this.#method } = { x: () => { } }); //Error, not writable 
        let x = this.#method;
        b.#method++; //Error, not writable 
    }
}
