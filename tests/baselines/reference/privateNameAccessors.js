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
var _prop, _prop_1, _roProp;
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
