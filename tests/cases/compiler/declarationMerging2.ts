// @module: amd

// @filename: a.ts
export class A {
    protected _f: number;
    getF() { return this._f; }
}

// @filename: b.ts
export {}
declare module "./a" {
    interface A {
        run();
    }
}