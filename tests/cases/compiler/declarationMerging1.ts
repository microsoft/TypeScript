// @filename: file1.ts
class A {
    protected _f: number;
    getF() { return this._f; }
}

// @filename: file2.ts
interface A {
    run();
}