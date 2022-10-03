// @target: es2015

class A {
    #myField = "hello world";
    constructor() {
        console.log(this.#myField);
    }
}
