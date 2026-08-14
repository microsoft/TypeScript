//// [tests/cases/compiler/declarationEmitPrivateNameInTypeQuery.ts] ////

//// [declarationEmitPrivateNameInTypeQuery.ts]
export class C1 {
    #a = 1;

    static #b = "";

    #c() {
        return 1 as const;
    }

    get #d() {
        return new Date();
    }

    ["#a"] = true;

    a: typeof this.#a = 1;

    test1(a: C1) {
        const b: typeof a.#a = 1;
        const c: typeof C1.#b = "";

        return [b, c] as const;
    }

}

export class C2 {
    #a = 1;

    static #b = "";
    public prop!: typeof C2.#b;

    test1() {
        class C {
            test1(a: C2): typeof a.#a {
                return 1;
            }
        }
        return new C().test1(this);
    }
}

//// [declarationEmitPrivateNameInTypeQuery.js]
export class C1 {
    #a = 1;
    static #b = "";
    #c() {
        return 1;
    }
    get #d() {
        return new Date();
    }
    ["#a"] = true;
    a = 1;
    test1(a) {
        const b = 1;
        const c = "";
        return [b, c];
    }
}
export class C2 {
    #a = 1;
    static #b = "";
    prop;
    test1() {
        class C {
            test1(a) {
                return 1;
            }
        }
        return new C().test1(this);
    }
}
