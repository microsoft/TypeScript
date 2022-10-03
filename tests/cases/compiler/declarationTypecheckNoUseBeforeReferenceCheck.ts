// @filename: index.d.ts
export class C extends Object {
    static readonly p: unique symbol;
    [C.p](): void;
}