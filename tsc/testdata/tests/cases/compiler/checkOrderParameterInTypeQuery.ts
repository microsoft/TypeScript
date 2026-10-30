// @strict: true
// @target: esnext
// @checkOrder: default, reverse, isolated, typesfirst

// Whether a parameter named in a reused return type annotation is the same
// symbol in the printed signature must not depend on whether the type of
// the parameter was resolved before the signature was instantiated.

export class C2 {
    #a = 1;
    test1() {
        class C {
            test1(a: C2): typeof a.#a {
                return 1;
            }
        }
        return new C().test1(this);
    }
}
