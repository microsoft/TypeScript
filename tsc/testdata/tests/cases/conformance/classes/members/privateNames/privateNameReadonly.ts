// @target: es2015

const C = class {
    #bar() {}
    foo() {
        this.#bar = console.log("should log this then throw");
    }
}

console.log(new C().foo());
