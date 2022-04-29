//// [tests/cases/conformance/emitter/es2018/asyncGenerators/emitter.asyncGenerators.classMethods.es2018.ts] ////

//// [C1.ts]
class C1 {
    async * f() {
    }
}
//// [C2.ts]
class C2 {
    async * f() {
        const x = yield;
    }
}
//// [C3.ts]
class C3 {
    async * f() {
        const x = yield 1;
    }
}
//// [C4.ts]
class C4 {
    async * f() {
        const x = yield* [1];
    }
}
//// [C5.ts]
class C5 {
    async * f() {
        const x = yield* (async function*() { yield 1; })();
    }
}
//// [C6.ts]
class C6 {
    async * f() {
        const x = await 1;
    }
}
//// [C7.ts]
class C7 {
    async * f() {
        return 1;
    }
}
//// [C8.ts]
class C8 {
    g() {
    }
    async * f() {
        this.g();
    }
}
//// [C9.ts]
class B9 {
    g() {}
}
class C9 extends B9 {
    async * f() {
        super.g();
    }
}


//// [C1.js]
class C1 {
    async *f() {
    }
}
//// [C2.js]
class C2 {
    async *f() {
        const x = yield;
    }
}
//// [C3.js]
class C3 {
    async *f() {
        const x = yield 1;
    }
}
//// [C4.js]
class C4 {
    async *f() {
        const x = yield* [1];
    }
}
//// [C5.js]
class C5 {
    async *f() {
        const x = yield* (async function* () { yield 1; })();
    }
}
//// [C6.js]
class C6 {
    async *f() {
        const x = await 1;
    }
}
//// [C7.js]
class C7 {
    async *f() {
        return 1;
    }
}
//// [C8.js]
class C8 {
    g() {
    }
    async *f() {
        this.g();
    }
}
//// [C9.js]
class B9 {
    g() { }
}
class C9 extends B9 {
    async *f() {
        super.g();
    }
}
