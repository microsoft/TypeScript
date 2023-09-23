// @strict: true

declare const aIndex: "key";
const a: { key?: { x?: number } } = {};
if (a[aIndex] && a[aIndex].x) {
    a[aIndex].x // number
}

declare const bIndex: "key";
const b: { key: { x?: number } } = { key: {} };
if (b[bIndex].x) {
    b[bIndex].x // number
}

declare const cIndex: 1;
interface Foo {
    x: number | undefined;
}
const c: Foo[] = [];
if (c[cIndex].x) {
    c[cIndex].x // number
}
