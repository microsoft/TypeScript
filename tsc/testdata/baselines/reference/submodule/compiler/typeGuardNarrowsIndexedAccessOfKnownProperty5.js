//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty5.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty5.ts]
const a: { key?: { x?: number } } = {};
const aIndex = "key";
if (a[aIndex] && a[aIndex].x) {
    a[aIndex].x // number
}

const b: { key: { x?: number } } = { key: {} };
const bIndex = "key";
if (b[bIndex].x) {
    b[bIndex].x // number
}

interface Foo {
    x: number | undefined;
}
const c: Foo[] = [];
const cIndex = 1;
if (c[cIndex].x) {
    c[cIndex].x // number
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty5.js]
const a = {};
const aIndex = "key";
if (a[aIndex] && a[aIndex].x) {
    a[aIndex].x; // number
}
const b = { key: {} };
const bIndex = "key";
if (b[bIndex].x) {
    b[bIndex].x; // number
}
const c = [];
const cIndex = 1;
if (c[cIndex].x) {
    c[cIndex].x; // number
}
