//// [tests/cases/conformance/classes/members/privateNames/privateNameReadonly.ts] ////

//// [privateNameReadonly.ts]
const C = class {
    #bar() {}
    foo() {
        this.#bar = console.log("should log this then throw");
    }
}

console.log(new C().foo());


//// [privateNameReadonly.js]
const C = class {
    #bar() { }
    foo() {
        this.#bar = console.log("should log this then throw");
    }
};
console.log(new C().foo());
