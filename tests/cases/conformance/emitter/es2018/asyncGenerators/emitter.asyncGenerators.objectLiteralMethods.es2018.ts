// @target: es2018
// @lib: esnext
// @filename: O1.ts
const o1 = {
    async * f() {
    }
}
// @filename: O2.ts
const o2 = {
    async * f() {
        const x = yield;
    }
}
// @filename: O3.ts
const o3 = {
    async * f() {
        const x = yield 1;
    }
}
// @filename: O4.ts
const o4 = {
    async * f() {
        const x = yield* [1];
    }
}
// @filename: O5.ts
const o5 = {
    async * f() {
        const x = yield* (async function*() { yield 1; })();
    }
}
// @filename: O6.ts
const o6 = {
    async * f() {
        const x = await 1;
    }
}
// @filename: O7.ts
const o7 = {
    async * f() {
        return 1;
    }
}
