//// [tests/cases/compiler/defaultIsNotVisibleInLocalScope.ts] ////

//// [a.ts]
export default function () {
    return true;
}
export type X = typeof default;  // expect error

//// [b.ts]
export default { a: true }
export type X = typeof default; // expect error

//// [a.js]
export default function () {
    return true;
}
//// [b.js]
export default { a: true };
