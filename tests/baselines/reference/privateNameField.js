//// [privateNameField.ts]
class A {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
}

//// [privateNameField.js]
var A = /** @class */ (function () {
    function A(name) {
        this.#name = name;
    }
    return A;
}());
