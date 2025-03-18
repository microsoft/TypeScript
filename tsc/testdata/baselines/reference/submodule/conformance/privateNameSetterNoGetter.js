//// [tests/cases/conformance/classes/members/privateNames/privateNameSetterNoGetter.ts] ////

//// [privateNameSetterNoGetter.ts]
const C = class {
    set #x(x) {}
    m() {
        this.#x += 2; // Error
    }
}

console.log(new C().m());


//// [privateNameSetterNoGetter.js]
const C = class {
    set #x(x) { }
    m() {
        this.#x += 2;
    }
};
console.log(new C().m());
