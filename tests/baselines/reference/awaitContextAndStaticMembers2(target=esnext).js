//// [awaitContextAndStaticMembers2.ts]
async function wrapper (v: Promise<number>) {
    return class {
        field = await (v);
    }
}


//// [awaitContextAndStaticMembers2.js]
async function wrapper(v) {
    return class {
        constructor() {
            this.field = await(v);
        }
    };
}
