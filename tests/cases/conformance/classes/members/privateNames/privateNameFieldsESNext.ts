// @target: esnext
// @useDefineForClassFields: false

class C {
    a = 123;
    #a = 10;
    c = "hello";
    #b;
    method() {
        console.log(this.#a);
        this.#a = "hello";
        console.log(this.#b);
    }
    static #m = "test";
    static #x;
    static test() {
        console.log(this.#m);
        console.log(this.#x = "test");
    }
    #something = () => 1234;
}

