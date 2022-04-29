// @filename: a.ts
export default function () {
    return true;
}
export type X = typeof default;  // expect error

// @filename: b.ts
export default { a: true }
export type X = typeof default; // expect error