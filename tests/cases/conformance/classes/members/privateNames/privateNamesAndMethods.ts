// @target: esnext
// @lib: esnext
// @useDefineForClassFields: false

class A {
    #foo(a: number) {}
    async #bar(a: number) {}
    async *#baz(a: number) {
        return 3;
    }
    #_quux: number;
    get #quux (): number {
        return this.#_quux;
    }
    set #quux (val: number) {
        this.#_quux = val; 
    }
    constructor () {
        this.#foo(30);
        this.#bar(30);
        this.#baz(30);
        this.#quux = this.#quux + 1;
        this.#quux++;
 }
}

class B extends A {
    #foo(a: string) {}
    constructor () {
        super();
        this.#foo("str");
    }
}
