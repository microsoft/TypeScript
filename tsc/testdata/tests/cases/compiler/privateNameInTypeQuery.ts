// @declaration: true
// @noUnusedLocals: true
// @strict: true
// @target: esnext

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

        type D = typeof C1.#a;
        var d: D = 1;

        return [b, c, d] as const;
    }

    test2<T extends C1>(a: T): typeof a.#a {
        const b: typeof a.#a = a.#a;
        return b;
    }

    test3<T extends C1 | { a: string }>(): typeof this.#a {
        return undefined as any;
    }

    test4(): any.#a {
        return "";
    }

    test5(): never.#a {
        throw new Error();
    }
}
