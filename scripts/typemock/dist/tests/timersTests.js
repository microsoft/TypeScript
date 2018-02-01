"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./sourceMapSupport");
const mock_1 = require("../mock");
const arg_1 = require("../arg");
const times_1 = require("../times");
const timers_1 = require("../timers");
const chai_1 = require("chai");
describe("timers", () => {
    describe("immediate", () => {
        it("set adds entry, does not invoke", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.setImmediate(spy.proxy);
            const pending = target.getPending();
            // assert
            chai_1.assert.strictEqual(pending.length, 1);
            chai_1.assert.strictEqual(pending[0].kind, "immediate");
            chai_1.assert.isDefined(handle);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set/clear", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.setImmediate(spy.proxy);
            target.clearImmedate(handle);
            const pending = target.getPending();
            // assert
            chai_1.assert.strictEqual(pending.length, 0);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set one and execute", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setImmediate(spy.proxy);
            const count = target.executeImmediates();
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(), times_1.Times.once());
        });
        it("set one with arg and execute", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setImmediate(spy.proxy, "a");
            const count = target.executeImmediates();
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(arg_1.Arg.typeof("string")), times_1.Times.once());
        });
        it("nested with maxDepth = 0", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.spy(() => { target.setImmediate(spy.proxy); });
            // act
            target.setImmediate(spy.proxy);
            const count = target.executeImmediates(/*maxDepth*/ 0);
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(), times_1.Times.once());
        });
        it("nested with maxDepth = 1", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.spy(() => { target.setImmediate(spy.proxy); });
            // act
            target.setImmediate(spy.proxy);
            const count = target.executeImmediates(/*maxDepth*/ 1);
            // assert
            chai_1.assert.strictEqual(count, 2);
            spy.verify(_ => _(), times_1.Times.exactly(2));
        });
    });
    describe("timeout", () => {
        it("set adds entry, does not invoke", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.setTimeout(spy.proxy, 0);
            const pending = target.getPending();
            // assert
            chai_1.assert.strictEqual(pending.length, 1);
            chai_1.assert.strictEqual(pending[0].kind, "timeout");
            chai_1.assert.isDefined(handle);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set/clear", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.setTimeout(spy.proxy, 0);
            target.clearTimeout(handle);
            const pending = target.getPending();
            // assert
            chai_1.assert.strictEqual(pending.length, 0);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set adds future entry, advance prior to due does not invoke", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setTimeout(spy.proxy, 10);
            const count = target.advance(9);
            // assert
            chai_1.assert.strictEqual(count, 0);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set adds future entry, advance to due invokes", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setTimeout(spy.proxy, 10);
            const count = target.advance(10);
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(), times_1.Times.once());
        });
        it("5 nested sets throttle", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = new mock_1.Mock(() => { target.setTimeout(spy.proxy, 0); });
            // act
            target.setTimeout(spy.proxy, 0);
            const count = target.advance(1);
            // assert
            chai_1.assert.strictEqual(count, 5);
            spy.verify(_ => _(), times_1.Times.exactly(5));
        });
    });
    describe("interval", () => {
        it("set adds entry, does not invoke", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.setInterval(spy.proxy, 0);
            const pending = target.getPending({ kind: "interval", ms: 10 });
            // assert
            chai_1.assert.strictEqual(pending.length, 1);
            chai_1.assert.strictEqual(pending[0].kind, "interval");
            chai_1.assert.strictEqual(pending[0].interval, 10);
            chai_1.assert.isDefined(handle);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set/clear", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.setInterval(spy.proxy, 0);
            target.clearInterval(handle);
            const pending = target.getPending({ kind: "interval", ms: 10 });
            // assert
            chai_1.assert.strictEqual(pending.length, 0);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set adds future entry, advance prior to due does not invoke", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setInterval(spy.proxy, 10);
            const count = target.advance(9);
            // assert
            chai_1.assert.strictEqual(count, 0);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("set adds future entry, advance to due invokes", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setInterval(spy.proxy, 10);
            const count = target.advance(10);
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(), times_1.Times.once());
        });
        it("set adds future entry, advance to due twice invokes twice", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.setInterval(spy.proxy, 10);
            const count = target.advance(20);
            // assert
            chai_1.assert.strictEqual(count, 2);
            spy.verify(_ => _(), times_1.Times.exactly(2));
        });
        it("set adds future entry, remove before second due time", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = new mock_1.Mock(() => { target.clearInterval(handle); });
            // act
            const handle = target.setInterval(spy.proxy, 10);
            const count = target.advance(20);
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(), times_1.Times.exactly(1));
        });
    });
    describe("frame", () => {
        it("request adds entry, does not invoke", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.requestAnimationFrame(spy.proxy);
            const pending = target.getPending({ ms: 16 });
            // assert
            chai_1.assert.strictEqual(pending.length, 1);
            chai_1.assert.strictEqual(pending[0].kind, "frame");
            chai_1.assert.isDefined(handle);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("request/cancel", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            const handle = target.requestAnimationFrame(spy.proxy);
            target.cancelAnimationFrame(handle);
            const pending = target.getPending();
            // assert
            chai_1.assert.strictEqual(pending.length, 0);
            spy.verify(_ => _(), times_1.Times.none());
        });
        it("request and advance past one frame", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.requestAnimationFrame(spy.proxy);
            const count = target.advance(16);
            // assert
            chai_1.assert.strictEqual(count, 1);
            spy.verify(_ => _(arg_1.Arg.number()), times_1.Times.once());
        });
        it("requests clamped to 16ms", () => {
            // arrange
            const target = new timers_1.Timers();
            const spy = mock_1.Mock.function();
            // act
            target.requestAnimationFrame(spy.proxy);
            target.advance(10);
            target.requestAnimationFrame(spy.proxy);
            const count = target.advance(16);
            // assert
            chai_1.assert.strictEqual(count, 2);
            spy.verify(_ => _(arg_1.Arg.number()), times_1.Times.exactly(2));
        });
    });
});

//# sourceMappingURL=timersTests.js.map
