// @lib: es5
describe("my test suite", () => {
    it("should run", () => {
        const a = $(".thing");
    });
});

suite("another suite", () => {
    test("everything else", () => {
        console.log(process.env);
        document.createElement("div");

        const x = require("fs");
        const y = Buffer.from([]);
        const z = module.exports;

        const a = new Map();
        const b = new Set();
        const c = new WeakMap();
        const d = new WeakSet();
        const e = Symbol();
        const f = Promise.resolve(0);

        const i: Iterator<any> = null as any;
        const j: AsyncIterator<any> = null as any;
        const k: Symbol = null as any;
        const l: Promise<any> = null as any;
    });
});