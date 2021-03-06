// @target: esnext, es6, es5
async function wrapper (v: Promise<number>) {
    return class {
        static staticField = await (v);
    }
}
