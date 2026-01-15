// @target: es2015

const C = class {
    set #x(x) {}
    m() {
        this.#x += 2; // Error
    }
}

console.log(new C().m());
