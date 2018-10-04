// @target: esnext
// @noImplicitAny: true
// @noEmit: true

interface Obj { key: "value"; }

async function fn1(): Promise<Obj> {
    const obj1: Obj = await { key: "value" };
    const obj2: Obj = await new Promise(resolve => resolve({ key: "value" }));
    return await { key: "value" };
}
