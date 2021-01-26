//// [privateNameAccessors.ts]
class A1 {
    get #prop() { return ""; }
    set #prop(param: string) { }

    get #roProp() { return ""; }

    constructor(name: string) {
        this.#prop = "";
        this.#roProp = ""; // Error
        console.log(this.#prop);
        console.log(this.#roProp);
    }
}


//// [privateNameAccessors.js]
"use strict";
var _A1_prop, _A1_prop_1, _A1_roProp;
class A1 {
    constructor(name) {
        this. = "";
        this. = ""; // Error
        console.log(this.);
        console.log(this.);
    }
    get () { return ""; }
    set (param) { }
    get () { return ""; }
}
