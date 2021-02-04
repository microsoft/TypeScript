// @strict: true
// @target: esnext

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
