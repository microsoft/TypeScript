//// [awaitContextAndStaticMembers1.ts]
async function wrapper (v: Promise<number>) {
    return class {
        static staticField = await (v);
    }
}


//// [awaitContextAndStaticMembers1.js]
async function wrapper(v) {
    var _a;
    return _a = class {
        },
        _a.staticField = await (v),
        _a;
}
