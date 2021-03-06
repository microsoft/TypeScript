// @target: esnext, es6, es5
async function wrapper (v: Promise<number>) {
    return class C {
        static staticField1 = await (v);
        static staticField2 = await (v) + C.staticField1;
    }
}
