//// [tests/cases/compiler/didYouMeanSuggestionErrors.ts] ////

//// [didYouMeanSuggestionErrors.ts]
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

//// [didYouMeanSuggestionErrors.js]
describe("my test suite", function () {
    it("should run", function () {
        var a = $(".thing");
    });
});
suite("another suite", function () {
    test("everything else", function () {
        console.log(process.env);
        document.createElement("div");
        var x = require("fs");
        var y = Buffer.from([]);
        var z = module.exports;
        var a = new Map();
        var b = new Set();
        var c = new WeakMap();
        var d = new WeakSet();
        var e = Symbol();
        var f = Promise.resolve(0);
        var i = null;
        var j = null;
        var k = null;
        var l = null;
    });
});
