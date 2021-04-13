// @strict: true
// @target: esnext
// @useDefineForClassFields: false

class Foo {
    #p1: (v: any) => asserts v is string = (v) => {
        if (typeof v !== "string") {
            throw new Error();
        }
    }
    m1(v: unknown) {
        this.#p1(v);
        v;
    }
}

class Foo2 {
    #p1(v: any): asserts v is string {
        if (typeof v !== "string") {
            throw new Error();
        }
    }
    m1(v: unknown) {
        this.#p1(v);
        v;
    }
}
