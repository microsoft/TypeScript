//// [awaitContextAndStaticMembers3.ts]
async function wrapper (v: Promise<number>) {
    return class C {
        static staticField1 = await (v);
        static staticField2 = await (v) + C.staticField1;
    }
}


//// [awaitContextAndStaticMembers3.js]
async function wrapper(v) {
    var _a;
    return _a = class C {
        },
        _a.staticField1 = await (v),
        _a.staticField2 = await (v) + _a.staticField1,
        _a;
}
