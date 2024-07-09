//// [tests/cases/conformance/emitter/es2018/asyncGenerators/emitter.asyncGenerators.objectLiteralMethods.es2018.ts] ////

//// [O1.ts]
const o1 = {
    async * f() {
    }
}
//// [O2.ts]
const o2 = {
    async * f() {
        const x = yield;
    }
}
//// [O3.ts]
const o3 = {
    async * f() {
        const x = yield 1;
    }
}
//// [O4.ts]
const o4 = {
    async * f() {
        const x = yield* [1];
    }
}
//// [O5.ts]
const o5 = {
    async * f() {
        const x = yield* (async function*() { yield 1; })();
    }
}
//// [O6.ts]
const o6 = {
    async * f() {
        const x = await 1;
    }
}
//// [O7.ts]
const o7 = {
    async * f() {
        return 1;
    }
}


//// [O1.js]
const o1 = {
    async *f() {
    }
};
//// [O2.js]
const o2 = {
    async *f() {
        const x = yield;
    }
};
//// [O3.js]
const o3 = {
    async *f() {
        const x = yield 1;
    }
};
//// [O4.js]
const o4 = {
    async *f() {
        const x = yield* [1];
    }
};
//// [O5.js]
const o5 = {
    async *f() {
        const x = yield* (async function* () { yield 1; })();
    }
};
//// [O6.js]
const o6 = {
    async *f() {
        const x = await 1;
    }
};
//// [O7.js]
const o7 = {
    async *f() {
        return 1;
    }
};
