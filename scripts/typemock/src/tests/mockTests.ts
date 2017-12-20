import "./sourceMapSupport";
import { Mock } from "../mock";
import { Arg } from "../arg";
import { Times } from "../times";
import { recordError } from "./utils";
import { assert } from "chai";

describe("mock", () => {
    describe("no setup", () => {
        it("get (exists)", () => {
            // arrange
            const target = { a: 1 };
            const mock = new Mock(target);

            // act
            const result = mock.proxy.a;

            // assert
            assert.equal(result, 1);
        });
        it("get (missing)", () => {
            // arrange
            const mock = new Mock<{ a?: number }>();

            // act
            const result = mock.proxy.a;

            // assert
            assert.isUndefined(result);
        });
        it("set (exists)", () => {
            // arrange
            const target = { a: 1 };
            const mock = new Mock(target);

            // act
            mock.proxy.a = 2;
            const result = mock.proxy.a;

            // assert
            assert.equal(result, 2);
        });
        it("set (missing)", () => {
            // arrange
            const mock = new Mock<{ a?: number }>();

            // act
            mock.proxy.a = 2;
            const result = mock.proxy.a;

            // assert
            assert.equal(result, 2);
        });
        it("method (existing)", () => {
            // arrange
            const target = { a() { return 1; } };
            const mock = new Mock(target);

            // act
            const result = mock.proxy.a();

            // assert
            assert.equal(1, result);
        });
    });

    describe("setup", () => {
        describe("using object", () => {
            it("get", () => {
                // arrange
                const target = { a: 1 };
                const mock = new Mock(target, { get a() { return 2; } });

                // act
                const result = mock.proxy.a;

                // assert
                assert.equal(2, result);
            });
            it("get with throw", () => {
                // arrange
                const target = { a: 1 };
                const error = new Error("error");
                const mock = new Mock(target, { get a(): number { throw error; } });

                // act
                const e = recordError(() => mock.proxy.a);

                // assert
                assert.strictEqual(error, e);
            });
            it("set", () => {
                // arrange
                let _a: number | undefined;
                const target = { a: 1 };
                const mock = new Mock(target, { set a(value: number) { _a = value; } });

                // act
                mock.proxy.a = 2;

                // assert
                assert.equal(2, _a);
                assert.equal(1, target.a);
            });
            it("set with throw", () => {
                // arrange
                const target = { a: 1 };
                const error = new Error("error");
                const mock = new Mock(target, { set a(_: number) { throw error; } });

                // act
                const e = recordError(() => mock.proxy.a = 2);

                // assert
                assert.strictEqual(error, e);
            });
            it("method", () => {
                // arrange
                const target = { a() { return 1; } };
                const mock = new Mock(target, { a() { return 2; } });

                // act
                const result = mock.proxy.a();

                // assert
                assert.equal(2, result);
            });
            it("method throws", () => {
                // arrange
                const target = { a() { return 1; } };
                const error = new Error("error");
                const mock = new Mock(target, { a(): number { throw error; } });

                // act
                const e = recordError(() => mock.proxy.a());

                // assert
                assert.strictEqual(error, e);
            });
            it("new property", () => {
                // arrange
                const target = { a: 1 };
                const mock = new Mock(target, <any>{ b: 2 });

                // act
                const result = (<any>mock.proxy).b;

                // assert
                assert.equal(2, result);
            });
            it("new method", () => {
                // arrange
                const target = { a: 1 };
                const mock = new Mock(target, <any>{ b() { return 2; } });

                // act
                const result = (<any>mock.proxy).b();

                // assert
                assert.equal(2, result);
            });
        });
        describe("using callback", () => {
            it("get only", () => {
                // arrange
                const mock = new Mock<{ a: number }>();
                mock.setup(_ => _.a, { return: 2 });

                // act
                const result1 = mock.proxy.a;
                const err = recordError(() => mock.proxy.a = 3);
                const result2 = mock.proxy.a;

                // assert
                assert.strictEqual(result1, 2);
                assert.strictEqual(result2, 2);
                assert.instanceOf(err, Error);
            });
            it("set only", () => {
                // arrange
                const mock = new Mock<{ a: number }>();
                mock.setup(_ => _.a = 2);

                // act
                const result = mock.proxy.a;
                const err2 = recordError(() => mock.proxy.a = 2);
                const err3 = recordError(() => mock.proxy.a = 3);

                // assert
                assert.isUndefined(result);
                assert.isUndefined(err2);
                assert.instanceOf(err3, Error);
            });
            it("get and set", () => {
                // arrange
                const mock = new Mock<{ a: number }>();
                mock.setup(_ => _.a, { return: 2 });
                mock.setup(_ => _.a = Arg.any());

                // act
                const result = mock.proxy.a;
                mock.proxy.a = 3;

                // assert
                assert.strictEqual(result, 2);
            });
            it("method", () => {
                // arrange
                const mock = new Mock<{ a(x: number): number; }>();
                mock.setup(_ => _.a(1), { return: 2 });

                // act
                const result = mock.proxy.a(1);

                // assert
                assert.strictEqual(result, 2);
            });
            it("function", () => {
                // arrange
                const mock = new Mock<(x: number) => number>(_ => 0);
                mock.setup(_ => _(Arg.number()), { return: 2 });

                // act
                const result = mock.proxy(1);

                // assert
                assert.strictEqual(result, 2);
            });
        });
    });

    describe("verify", () => {
        describe("no setup", () => {
            describe("get", () => {
                it("not called throws", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new Mock(target);

                    // act
                    const e = recordError(() => mock.verify(_ => _.a, Times.once()));

                    // assert
                    assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new Mock(target);
                    mock.proxy.a;

                    // act
                    const e = recordError(() => mock.verify(_ => _.a, Times.once()));

                    // assert
                    assert.isUndefined(e);
                });
            });
            describe("set", () => {
                it("not called throws", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new Mock(target);

                    // act
                    const e = recordError(() => mock.verify(_ => _.a = 2, Times.once()));

                    // assert
                    assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const target = { a: 1 };
                    const mock = new Mock(target);
                    mock.proxy.a = 2;

                    // act
                    const e = recordError(() => mock.verify(_ => _.a = 2, Times.once()));

                    // assert
                    assert.isUndefined(e);
                });
            });
            describe("method", () => {
                it("not called throws", () => {
                    // arrange
                    const target = { a() { return 1; } };
                    const mock = new Mock(target);

                    // act
                    const e = recordError(() => mock.verify(_ => _.a(), Times.once()));

                    // assert
                    assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const target = { a() { return 1; } };
                    const mock = new Mock(target);
                    mock.proxy.a();

                    // act
                    const e = recordError(() => mock.verify(_ => _.a(), Times.once()));

                    // assert
                    assert.isUndefined(e);
                });
            });
            describe("function", () => {
                it("not called throws", () => {
                    // arrange
                    const mock = Mock.function();

                    // act
                    const e = recordError(() => mock.verify(_ => _(), Times.once()));

                    // assert
                    assert.instanceOf(e, Error);
                });
                it("called passes", () => {
                    // arrange
                    const mock = Mock.function();
                    mock.proxy();

                    // act
                    const e = recordError(() => mock.verify(_ => _(), Times.once()));

                    // assert
                    assert.isUndefined(e);
                });
            });
        });
        it("setup get, called passes", () => {
            // arrange
            const target = { a: 1 };
            const mock = new Mock(target, { get a() { return 2 } });
            mock.proxy.a;

            // act
            const e = recordError(() => mock.verify(_ => _.a, Times.once()));

            // assert
            assert.isUndefined(e);
        });
        it("setup method, called passes", () => {
            // arrange
            const target = { a(x: number) { return x + 1; } };
            const mock = new Mock(target, {
                a(x: number) {
                    return x + 2;
                }
            });
            mock.proxy.a(3);

            // act
            const e = recordError(() => mock.verify(_ => _.a(Arg.number()), Times.once()));

            // assert
            assert.isUndefined(e);
        });
    });
});