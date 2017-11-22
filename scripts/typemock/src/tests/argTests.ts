import "./sourceMapSupport";
import { Arg } from "../arg";
import { assert } from "chai";

describe("arg", () => {
    describe("any", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.any());

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.any());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<any>`);
        });
    });
    describe("is", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.is(value => value === "a"));

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.is(value => value === "a"));

            // act
            const result = Arg.validate(target, ["b"], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.is(value => value === "a"));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<is>`);
        });
    });
    describe("notNull", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.notNull());

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.notNull());

            // act
            const result = Arg.validate(target, [null], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.notNull());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<not null>`);
        });
    });
    describe("null", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.null());

            // act
            const result = Arg.validate(target, [null], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.null());

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.null());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<null>`);
        });
    });
    describe("notUndefined", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.notUndefined());

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.notUndefined());

            // act
            const result = Arg.validate(target, [undefined], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.notUndefined());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<not undefined>`);
        });
    });
    describe("undefined", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.undefined());

            // act
            const result = Arg.validate(target, [undefined], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.undefined());

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.undefined());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<undefined>`);
        });
    });
    describe("notNullOrUndefined", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.notNullOrUndefined());

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid (null)", () => {
            // arrange
            const target = Arg.from(Arg.notNullOrUndefined());

            // act
            const result = Arg.validate(target, [null], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("invalid (undefined)", () => {
            // arrange
            const target = Arg.from(Arg.notNullOrUndefined());

            // act
            const result = Arg.validate(target, [undefined], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.notNullOrUndefined());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<not null or undefined>`);
        });
    });
    describe("nullOrUndefined", () => {
        it("valid (null)", () => {
            // arrange
            const target = Arg.from(Arg.nullOrUndefined());

            // act
            const result = Arg.validate(target, [null], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("valid (undefined)", () => {
            // arrange
            const target = Arg.from(Arg.nullOrUndefined());

            // act
            const result = Arg.validate(target, [undefined], 0);

            // assert
            assert.isTrue(result.valid);
            assert.strictEqual(result.next, 1);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.nullOrUndefined());

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.nullOrUndefined());

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<null or undefined>`);
        });
    });
    describe("between", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.between(1, 3));

            // act
            const min = Arg.validate(target, [1], 0);
            const mid = Arg.validate(target, [2], 0);
            const max = Arg.validate(target, [3], 0);

            // assert
            assert.isTrue(min.valid);
            assert.isTrue(mid.valid);
            assert.isTrue(max.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.between(1, 3));

            // act
            const before = Arg.validate(target, [0], 0);
            const after = Arg.validate(target, [4], 0);

            // assert
            assert.isFalse(before.valid);
            assert.isFalse(after.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.between(1, 3));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<between 1 and 3>`);
        });
    });
    describe("in", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.in(["a", "b"]));

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isTrue(result.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.in(["a", "b"]));

            // act
            const result = Arg.validate(target, ["c"], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.in(["a", "b"]));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<in a, b>`);
        });
    });
    describe("notIn", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.notIn(["a", "b"]));

            // act
            const result = Arg.validate(target, ["c"], 0);

            // assert
            assert.isTrue(result.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.notIn(["a", "b"]));

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.notIn(["a", "b"]));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<not in a, b>`);
        });
    });
    describe("match", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.match(/^a$/));

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isTrue(result.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.match(/^a$/));

            // act
            const result = Arg.validate(target, ["b"], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.match(/^a$/));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<matches /^a$/>`);
        });
    });
    describe("typeof", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.typeof("number"));

            // act
            const result = Arg.validate(target, [1], 0);

            // assert
            assert.isTrue(result.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.typeof("number"));

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.typeof("number"));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<typeof number>`);
        });
    });
    describe("instanceof", () => {
        it("valid", () => {
            // arrange
            class C {}
            const target = Arg.from(Arg.instanceof(C));

            // act
            const result = Arg.validate(target, [new C()], 0);

            // assert
            assert.isTrue(result.valid);
        });
        it("invalid", () => {
            // arrange
            class C {}
            const target = Arg.from(Arg.instanceof(C));

            // act
            const result = Arg.validate(target, [{}], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            class C {}
            const target = Arg.from(Arg.instanceof(C));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<instanceof C>`);
        });
    });
    describe("has", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.has("a"));

            // act
            const own = Arg.validate(target, [{ a: 1 }], 0);
            const proto = Arg.validate(target, [{ __proto__: { a: 1 } }], 0);

            // assert
            assert.isTrue(own.valid);
            assert.isTrue(proto.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.has("a"));

            // act
            const result = Arg.validate(target, [{ b: 1 }], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.has("a"));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<has a>`);
        });
    });
    describe("hasOwn", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from(Arg.hasOwn("a"));

            // act
            const own = Arg.validate(target, [{ a: 1 }], 0);

            // assert
            assert.isTrue(own.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from(Arg.hasOwn("a"));

            // act
            const result = Arg.validate(target, [{ b: 1 }], 0);
            const proto = Arg.validate(target, [{ __proto__: { a: 1 } }], 0);

            // assert
            assert.isFalse(result.valid);
            assert.isFalse(proto.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from(Arg.hasOwn("a"));

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<hasOwn a>`);
        });
    });
    describe("rest", () => {
        describe("no condition", () => {
            it("valid", () => {
                // arrange
                const target = Arg.from(Arg.rest());

                // act
                const empty = Arg.validate(target, [], 0);
                const multiple = Arg.validate(target, ["a", "b"], 0);

                // assert
                assert.isTrue(empty.valid);
                assert.strictEqual(empty.next, 0);
                assert.isTrue(multiple.valid);
                assert.strictEqual(multiple.next, 2);
            });
            it("toString", () => {
                // arrange
                const target = Arg.from(Arg.rest());

                // act
                const result = target.toString();

                // assert
                assert.strictEqual(result, `<rest>`);
            });
        });
        describe("condition", () => {
            it("valid", () => {
                // arrange
                const target = Arg.from(Arg.rest(Arg.typeof("string")));

                // act
                const empty = Arg.validate(target, [], 0);
                const multiple = Arg.validate(target, ["a", "b"], 0);

                // assert
                assert.isTrue(empty.valid);
                assert.strictEqual(empty.next, 0);
                assert.isTrue(multiple.valid);
                assert.strictEqual(multiple.next, 2);
            });
            it("invalid", () => {
                // arrange
                const target = Arg.from(Arg.rest(Arg.typeof("string")));

                // act
                const result = Arg.validate(target, ["a", 1], 0);

                // assert
                assert.isFalse(result.valid);
            });
            it("toString", () => {
                // arrange
                const target = Arg.from(Arg.rest(Arg.typeof("string")));

                // act
                const result = target.toString();

                // assert
                assert.strictEqual(result, `<rest typeof string>`);
            });
        });
    });
    describe("from", () => {
        it("valid", () => {
            // arrange
            const target = Arg.from("a");

            // act
            const result = Arg.validate(target, ["a"], 0);

            // assert
            assert.isTrue(result.valid);
        });
        it("invalid", () => {
            // arrange
            const target = Arg.from("a");

            // act
            const result = Arg.validate(target, ["b"], 0);

            // assert
            assert.isFalse(result.valid);
        });
        it("toString", () => {
            // arrange
            const target = Arg.from("a");

            // act
            const result = target.toString();

            // assert
            assert.strictEqual(result, `<"a">`);
        });
    });
});