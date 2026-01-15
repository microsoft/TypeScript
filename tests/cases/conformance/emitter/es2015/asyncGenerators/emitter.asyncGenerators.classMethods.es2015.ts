// @target: es2015
// @lib: esnext
// @filename: C1.ts
class C1 {
    async * f() {
    }
}
// @filename: C2.ts
class C2 {
    async * f() {
        const x = yield;
    }
}
// @filename: C3.ts
class C3 {
    async * f() {
        const x = yield 1;
    }
}
// @filename: C4.ts
class C4 {
    async * f() {
        const x = yield* [1];
    }
}
// @filename: C5.ts
class C5 {
    async * f() {
        const x = yield* (async function*() { yield 1; })();
    }
}
// @filename: C6.ts
class C6 {
    async * f() {
        const x = await 1;
    }
}
// @filename: C7.ts
class C7 {
    async * f() {
        return 1;
    }
}
// @filename: C8.ts
class C8 {
    g() {
    }
    async * f() {
        this.g();
    }
}
// @filename: C9.ts
class B9 {
    g() {}
}
class C9 extends B9 {
    async * f() {
        super.g();
    }
}
