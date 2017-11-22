import "./sourceMapSupport";
import { Mock } from "../mock";
import { Stub } from "../stub";
import { Arg } from "../arg";
import { Times } from "../times";
import { recordError } from "./utils";
import { assert } from "chai";

describe("mock", () => {
    it("mock get with no setups", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target);

        // act
        const result = mock.value.a;

        // assert
        assert.equal(1, result);
    });
    it("mock setup property get with return", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target, { get a() { return 2; } });

        // act
        const result = mock.value.a;

        // assert
        assert.equal(2, result);
    });
    it("mock setup property get with throw", () => {
        // arrange
        const target = { a: 1 };
        const error = new Error("error");
        const mock = new Mock(target, { get a(): number { throw error; } });

        // act
        const e = recordError(() => mock.value.a);

        // assert
        assert.strictEqual(error, e);
    });
    it("mock setup property set", () => {
        // arrange
        let _a: number | undefined;
        const target = { a: 1 };
        const mock = new Mock(target, { set a(value: number) { _a = value; } });

        // act
        mock.value.a = 2;

        // assert
        assert.equal(2, _a);
        assert.equal(1, target.a);
    });
    it("mock setup property set with throw", () => {
        // arrange
        const target = { a: 1 };
        const error = new Error("error");
        const mock = new Mock(target, { set a(value: number) { throw error; } });

        // act
        const e = recordError(() => mock.value.a = 2);

        // assert
        assert.strictEqual(error, e);
    });
    it("mock setup method call no setups", () => {
        // arrange
        const target = { a() { return 1; } };
        const mock = new Mock(target);

        // act
        const result = mock.value.a();

        // assert
        assert.equal(1, result);
    });
    it("mock setup method callback", () => {
        // arrange
        const target = { a() { return 1; } };
        const mock = new Mock(target, { a() { return 2; } });

        // act
        const result = mock.value.a();

        // assert
        assert.equal(2, result);
    });
    it("mock setup method callback throws", () => {
        // arrange
        const target = { a() { return 1; } };
        const error = new Error("error");
        const mock = new Mock(target, { a(): number { throw error; } });

        // act
        const e = recordError(() => mock.value.a());

        // assert
        assert.strictEqual(error, e);
    });
    it("mock setup new property", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target, <any>{ b: 2 });

        // act
        const result = (<any>mock.value).b;

        // assert
        assert.equal(2, result);
    });
    it("mock setup new method", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target, <any>{ b() { return 2; } });

        // act
        const result = (<any>mock.value).b();

        // assert
        assert.equal(2, result);
    });
    it("mock verify get no setups, not called throws", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target);

        // act
        const e = recordError(() => mock.verify(_ => _.a, Times.once()));

        // assert
        assert.instanceOf(e, Error);
    });
    it("mock verify get no setups, called passes", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target);
        const result = mock.value.a;

        // act
        const e = recordError(() => mock.verify(_ => _.a, Times.once()));

        // assert
        assert.isUndefined(e);
    });
    it("mock verify setup get, called passes", () => {
        // arrange
        const target = { a: 1 };
        const mock = new Mock(target, { get a() { return 2 } });
        const result = mock.value.a;

        // act
        const e = recordError(() => mock.verify(_ => _.a, Times.once()));

        // assert
        assert.isUndefined(e);
    });
    it("mock verify method no setups, not called throws", () => {
        // arrange
        const target = { a() { return 1; } };
        const mock = new Mock(target);

        // act
        const e = recordError(() => mock.verify(_ => _.a(), Times.once()));

        // assert
        assert.instanceOf(e, Error);
    });
    it("mock verify method no setups, called passes", () => {
        // arrange
        const target = { a() { return 1; } };
        const mock = new Mock(target);
        const result = mock.value.a();

        // act
        const e = recordError(() => mock.verify(_ => _.a(), Times.once()));

        // assert
        assert.isUndefined(e);
    });
    it("mock verify setup method, called passes", () => {
        // arrange
        const target = { a(x: number) { return x + 1; } };
        const mock = new Mock(target, {
            a(x: number) {
                return x + 2;
            }
        });
        const result = mock.value.a(3);

        // act
        const e = recordError(() => mock.verify(_ => _.a(Arg.number()), Times.once()));

        // assert
        assert.isUndefined(e);
    });
    it("mock setup method using callback", () => {
        // arrange
        const mock = new Mock<{ a(x: number): number; }>();
        mock.setup(_ => _.a(1), { returns: 2 });

        // act
        const result = mock.value.a(1);

        // assert
        assert.strictEqual(result, 2);
    });
    it("mock setup setter/getter using callback", () => {
        // arrange
        const mock = new Mock<{ a: number }>();
        mock.setup(_ => _.a, { returns: 2 });
        mock.setup(_ => _.a = Arg.any());

        // act
        const result = mock.value.a;
        mock.value.a = 3;

        // assert
        assert.strictEqual(result, 2);
    });
    it("mock setup getter only using callback", () => {
        // arrange
        const mock = new Mock<{ a: number }>();
        mock.setup(_ => _.a, { returns: 2 });

        // act
        const result = mock.value.a;
        const err = recordError(() => mock.value.a = 3);

        // assert
        assert.strictEqual(result, 2);
        assert.instanceOf(err, Error);
    });
    it("mock setup setter only using callback", () => {
        // arrange
        const mock = new Mock<{ a: number }>();
        mock.setup(_ => _.a = 2);

        // act
        const err1 = recordError(() => mock.value.a);
        const err2 = recordError(() => mock.value.a = 2);
        const err3 = recordError(() => mock.value.a = 3);

        // assert
        assert.instanceOf(err1, Error);
        assert.isUndefined(err2);
        assert.instanceOf(err3, Error);
    });
    it("mock setup function only using callback", () => {
        // arrange
        const mock = new Mock<(x: number) => number>(x => 0);
        mock.setup(_ => _(Arg.number()), { returns: 2 });

        // act
        const result = mock.value(1);

        // assert
        assert.strictEqual(result, 2);
    });
});