"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./sourceMapSupport");
const mock_1 = require("../mock");
const arg_1 = require("../arg");
const times_1 = require("../times");
const utils_1 = require("./utils");
const chai_1 = require("chai");
describe("mock", () => {
    describe("no setup", () => {
        it("get (exists)", () => {
            // arrange
            const target = { a: 1 };
            const mock = new mock_1.Mock(target);
            // act
            const result = mock.proxy.a;
            // assert
            chai_1.assert.equal(result, 1);
        });
        it("get (missing)", () => {
            // arrange
            const mock = new mock_1.Mock();
            // act
            const result = mock.proxy.a;
            // assert
            chai_1.assert.isUndefined(result);
        });
        it("set (exists)", () => {
            // arrange
            const target = { a: 1 };
            const mock = new mock_1.Mock(target);
            // act
            mock.proxy.a = 2;
            const result = mock.proxy.a;
            // assert
            chai_1.assert.equal(result, 2);
        });
        it("set (missing)", () => {
            // arrange
            const mock = new mock_1.Mock();
            // act
            mock.proxy.a = 2;
            const result = mock.proxy.a;
            // assert
            chai_1.assert.equal(result, 2);
        });
        it("method (existing)", () => {
            // arrange
            const target = { a() { return 1; } };
            const mock = new mock_1.Mock(target);
            // act
            const result = mock.proxy.a();
            // assert
            chai_1.assert.equal(1, result);
        });
    });
    describe("setup", () => {
        describe("using object", () => {
            it("get", () => {
                // arrange
                const target = { a: 1 };
                const mock = new mock_1.Mock(target, { get a() { return 2; } });
                // act
                const result = mock.proxy.a;
                // assert
                chai_1.assert.equal(2, result);
            });
            it("get with throw", () => {
                // arrange
                const target = { a: 1 };
                const error = new Error("error");
                const mock = new mock_1.Mock(target, { get a() { throw error; } });
                // act
                const e = utils_1.recordError(() => mock.proxy.a);
                // assert
                chai_1.assert.strictEqual(error, e);
            });
            it("set", () => {
                // arrange
                let _a;
                const target = { a: 1 };
                const mock = new mock_1.Mock(target, { set a(value) { _a = value; } });
                // act
                mock.proxy.a = 2;
                // assert
                chai_1.assert.equal(2, _a);
                chai_1.assert.equal(1, target.a);
            });
            it("set with throw", () => {
                // arrange
                const target = { a: 1 };
                const error = new Error("error");
                const mock = new mock_1.Mock(target, { set a(_) { throw error; } });
                // act
                const e = utils_1.recordError(() => mock.proxy.a = 2);
                // assert
                chai_1.assert.strictEqual(error, e);
            });
            it("method", () => {
                // arrange
                const target = { a() { return 1; } };
                const mock = new mock_1.Mock(target, { a() { return 2; } });
                // act
                const result = mock.proxy.a();
                // assert
                chai_1.assert.equal(2, result);
            });
            it("method throws", () => {
                // arrange
                const target = { a() { return 1; } };
                const error = new Error("error");
                const mock = new mock_1.Mock(target, { a() { throw error; } });
                // act
                const e = utils_1.recordError(() => mock.proxy.a());
                // assert
                chai_1.assert.strictEqual(error, e);
            });
            it("new property", () => {
                // arrange
                const target = { a: 1 };
                const mock = new mock_1.Mock(target, { b: 2 });
                // act
                const result = mock.proxy.b;
                // assert
                chai_1.assert.equal(2, result);
            });
            it("new method", () => {
                // arrange
                const target = { a: 1 };
                const mock = new mock_1.Mock(target, { b() { return 2; } });
                // act
                const result = mock.proxy.b();
                // assert
                chai_1.assert.equal(2, result);
            });
        });
        describe("using callback", () => {
            it("get only", () => {
                // arrange
                const mock = new mock_1.Mock();
                mock.setup(_ => _.a, { return: 2 });
                // act
                const result1 = mock.proxy.a;
                const err = utils_1.recordError(() => mock.proxy.a = 3);
                const result2 = mock.proxy.a;
                // assert
                chai_1.assert.strictEqual(result1, 2);
                chai_1.assert.strictEqual(result2, 2);
                chai_1.assert.instanceOf(err, Error);
            });
            it("set only", () => {
                // arrange
                const mock = new mock_1.Mock();
                mock.setup(_ => _.a = 2);
                // act
                const result = mock.proxy.a;
                const err2 = utils_1.recordError(() => mock.proxy.a = 2);
                const err3 = utils_1.recordError(() => mock.proxy.a = 3);
                // assert
                chai_1.assert.isUndefined(result);
                chai_1.assert.isUndefined(err2);
                chai_1.assert.instanceOf(err3, Error);
            });
            it("get and set", () => {
                // arrange
                const mock = new mock_1.Mock();
                mock.setup(_ => _.a, { return: 2 });
                mock.setup(_ => _.a = arg_1.Arg.any());
                // act
                const result = mock.proxy.a;
                mock.proxy.a = 3;
                // assert
                chai_1.assert.strictEqual(result, 2);
            });
            it("method", () => {
                // arrange
                const mock = new mock_1.Mock();
                mock.setup(_ => _.a(1), { return: 2 });
                // act
                const result = mock.proxy.a(1);
                // assert
                chai_1.assert.strictEqual(result, 2);
            });
            it("function", () => {
                // arrange
                const mock = new mock_1.Mock(_ => 0);
                mock.setup(_ => _(arg_1.Arg.number()), { return: 2 });
                // act
                const result = mock.proxy(1);
                // assert
                chai_1.assert.strictEqual(result, 2);
            });
        });
    });
    describe("verify", () => {
        describe("no setup", () => {
            describe("get", () => {
                it("not called throws", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new mock_1.Mock(target);
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _.a, times_1.Times.once()));
                    // assert
                    chai_1.assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new mock_1.Mock(target);
                    mock.proxy.a;
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _.a, times_1.Times.once()));
                    // assert
                    chai_1.assert.isUndefined(e);
                });
            });
            describe("set", () => {
                it("not called throws", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new mock_1.Mock(target);
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _.a = 2, times_1.Times.once()));
                    // assert
                    chai_1.assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new mock_1.Mock(target);
                    mock.proxy.a = 2;
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _.a = 2, times_1.Times.once()));
                    // assert
                    chai_1.assert.isUndefined(e);
                });
            });
            describe("method", () => {
                it("not called throws", () => {
                    // arrange
                    const target = { a() { return 1; } };
                    const mock = new mock_1.Mock(target);
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _.a(), times_1.Times.once()));
                    // assert
                    chai_1.assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const target = { a() { return 1; } };
                    const mock = new mock_1.Mock(target);
                    mock.proxy.a();
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _.a(), times_1.Times.once()));
                    // assert
                    chai_1.assert.isUndefined(e);
                });
            });
            describe("function", () => {
                it("not called throws", () => {
                    // arrange
                    const mock = mock_1.Mock.function();
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _(), times_1.Times.once()));
                    // assert
                    chai_1.assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const mock = mock_1.Mock.function();
                    mock.proxy();
                    // act
                    const e = utils_1.recordError(() => mock.verify(_ => _(), times_1.Times.once()));
                    // assert
                    chai_1.assert.isUndefined(e);
                });
            });
        });
        it("setup get, called passes", () => {
            // arrange
            const target = { a: 1 };
            const mock = new mock_1.Mock(target, { get a() { return 2; } });
            mock.proxy.a;
            // act
            const e = utils_1.recordError(() => mock.verify(_ => _.a, times_1.Times.once()));
            // assert
            chai_1.assert.isUndefined(e);
        });
        it("setup method, called passes", () => {
            // arrange
            const target = { a(x) { return x + 1; } };
            const mock = new mock_1.Mock(target, {
                a(x) {
                    return x + 2;
                }
            });
            mock.proxy.a(3);
            // act
            const e = utils_1.recordError(() => mock.verify(_ => _.a(arg_1.Arg.number()), times_1.Times.once()));
            // assert
            chai_1.assert.isUndefined(e);
        });
    });
});

//# sourceMappingURL=mockTests.js.map
