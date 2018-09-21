// @target: esnext
// @noImplicitAny: true
// @noEmit: true

interface Obj { key: "value"; }

async function fn1(): Promise<Obj> {
    return { key: "value" };
}

async function fn2(): Promise<Obj> {
    return new Promise(resolve => {
        resolve({ key: "value" });
    });
}