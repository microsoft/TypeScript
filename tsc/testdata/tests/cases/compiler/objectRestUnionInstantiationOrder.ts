// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst

function f<T>(v: { k: "a"; a: T } | { k: "b"; b: number }) {
    const { k, ...rest } = v;
    return { all: rest, onlyB: "b" in rest ? rest : undefined };
}
const o = f({ k: "a", a: "s" });
const all = o.all;
const onlyB = o.onlyB;
