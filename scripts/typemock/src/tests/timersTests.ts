import "./sourceMapSupport";
import { Spy } from "../spy";
import { Arg } from "../arg";
import { Times } from "../times";
import { Timers } from "../timers";
import { assert } from "chai";

describe("timers", () => {
    describe("immediate", () => {
        it("set adds entry, does not invoke", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.setImmediate(spy.value);
            const pending = target.getPending();

            // assert
            assert.strictEqual(pending.length, 1);
            assert.strictEqual(pending[0].kind, "immediate");
            assert.isDefined(handle);
            spy.called(Times.none());
        });
        it("set/clear", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.setImmediate(spy.value);
            target.clearImmedate(handle);
            const pending = target.getPending();

            // assert
            assert.strictEqual(pending.length, 0);
            spy.called(Times.none());
        });
        it("set one and execute", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setImmediate(spy.value);
            const count = target.executeImmediates();

            // assert
            assert.strictEqual(count, 1);
            spy.called(Times.once());
        });
        it("set one with arg and execute", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setImmediate(spy.value, "a");
            const count = target.executeImmediates();

            // assert
            assert.strictEqual(count, 1);
            spy.verify(_ => _(Arg.typeof("string")), Times.once());
        });
        it("nested with maxDepth = 0", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy(() => { target.setImmediate(spy.value); });

            // act
            target.setImmediate(spy.value);
            const count = target.executeImmediates(/*maxDepth*/ 0);

            // assert
            assert.strictEqual(count, 1);
            spy.called(Times.once());
        });
        it("nested with maxDepth = 1", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy(() => { target.setImmediate(spy.value); });

            // act
            target.setImmediate(spy.value);
            const count = target.executeImmediates(/*maxDepth*/ 1);

            // assert
            assert.strictEqual(count, 2);
            spy.called(Times.exactly(2));
        });
    });
    describe("timeout", () => {
        it("set adds entry, does not invoke", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.setTimeout(spy.value, 0);
            const pending = target.getPending();

            // assert
            assert.strictEqual(pending.length, 1);
            assert.strictEqual(pending[0].kind, "timeout");
            assert.isDefined(handle);
            spy.called(Times.none());
        });
        it("set/clear", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.setTimeout(spy.value, 0);
            target.clearTimeout(handle);
            const pending = target.getPending();

            // assert
            assert.strictEqual(pending.length, 0);
            spy.called(Times.none());
        });
        it("set adds future entry, advance prior to due does not invoke", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setTimeout(spy.value, 10);
            const count = target.advance(9);

            // assert
            assert.strictEqual(count, 0);
            spy.called(Times.none());
        });
        it("set adds future entry, advance to due invokes", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setTimeout(spy.value, 10);
            const count = target.advance(10);

            // assert
            assert.strictEqual(count, 1);
            spy.called(Times.once());
        });
        it("5 nested sets throttle", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy(() => { target.setTimeout(spy.value, 0); });

            // act
            target.setTimeout(spy.value, 0);
            const count = target.advance(1);

            // assert
            assert.strictEqual(count, 5);
            spy.called(Times.exactly(5));
        });
    });
    describe("interval", () => {
        it("set adds entry, does not invoke", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.setInterval(spy.value, 0);
            const pending = target.getPending({ kind: "interval", ms: 10 });

            // assert
            assert.strictEqual(pending.length, 1);
            assert.strictEqual(pending[0].kind, "interval");
            assert.strictEqual(pending[0].interval, 10);
            assert.isDefined(handle);
            spy.called(Times.none());
        });
        it("set/clear", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.setInterval(spy.value, 0);
            target.clearInterval(handle);
            const pending = target.getPending({ kind: "interval", ms: 10 });

            // assert
            assert.strictEqual(pending.length, 0);
            spy.called(Times.none());
        });
        it("set adds future entry, advance prior to due does not invoke", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setInterval(spy.value, 10);
            const count = target.advance(9);

            // assert
            assert.strictEqual(count, 0);
            spy.called(Times.none());
        });
        it("set adds future entry, advance to due invokes", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setInterval(spy.value, 10);
            const count = target.advance(10);

            // assert
            assert.strictEqual(count, 1);
            spy.called(Times.once());
        });
        it("set adds future entry, advance to due twice invokes twice", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.setInterval(spy.value, 10);
            const count = target.advance(20);

            // assert
            assert.strictEqual(count, 2);
            spy.called(Times.exactly(2));
        });
        it("set adds future entry, remove before second due time", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy(() => { target.clearInterval(handle); });

            // act
            const handle = target.setInterval(spy.value, 10);
            const count = target.advance(20);

            // assert
            assert.strictEqual(count, 1);
            spy.called(Times.exactly(1));
        });
    });
    describe("frame", () => {
        it("request adds entry, does not invoke", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.requestAnimationFrame(spy.value);
            const pending = target.getPending({ ms: 16 });

            // assert
            assert.strictEqual(pending.length, 1);
            assert.strictEqual(pending[0].kind, "frame");
            assert.isDefined(handle);
            spy.called(Times.none());
        });
        it("request/cancel", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            const handle = target.requestAnimationFrame(spy.value);
            target.cancelAnimationFrame(handle);
            const pending = target.getPending();

            // assert
            assert.strictEqual(pending.length, 0);
            spy.called(Times.none());
        });
        it("request and advance past one frame", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.requestAnimationFrame(spy.value);
            const count = target.advance(16);

            // assert
            assert.strictEqual(count, 1);
            spy.called(Times.once());
        });
        it("requests clamped to 16ms", () => {
            // arrange
            const target = new Timers();
            const spy = new Spy();

            // act
            target.requestAnimationFrame(spy.value);
            target.advance(10);
            target.requestAnimationFrame(spy.value);
            const count = target.advance(16);

            // assert
            assert.strictEqual(count, 2);
            spy.called(Times.exactly(2));
        });
    });
});