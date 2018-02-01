"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./sourceMapSupport");
const arg_1 = require("../arg");
const chai_1 = require("chai");
describe("arg", () => {
    describe("any", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.any());
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isTrue(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.any());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<any>`);
        });
    });
    describe("is", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.is(value => value === "a"));
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.is(value => value === "a"));
            // act
            const result = arg_1.Arg.validate(target, "b");
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.is(value => value === "a"));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<is>`);
        });
    });
    describe("notNull", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNull());
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNull());
            // act
            const result = arg_1.Arg.validate(target, null);
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNull());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<not null>`);
        });
    });
    describe("null", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.null());
            // act
            const result = arg_1.Arg.validate(target, null);
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.null());
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.null());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<null>`);
        });
    });
    describe("notUndefined", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notUndefined());
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notUndefined());
            // act
            const result = arg_1.Arg.validate(target, undefined);
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notUndefined());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<not undefined>`);
        });
    });
    describe("undefined", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.undefined());
            // act
            const result = arg_1.Arg.validate(target, undefined);
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.undefined());
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.undefined());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<undefined>`);
        });
    });
    describe("notNullOrUndefined", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNullOrUndefined());
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid (null)", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNullOrUndefined());
            // act
            const result = arg_1.Arg.validate(target, null);
            // assert
            chai_1.assert.isFalse(result);
        });
        it("invalid (undefined)", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNullOrUndefined());
            // act
            const result = arg_1.Arg.validate(target, undefined);
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notNullOrUndefined());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<not null or undefined>`);
        });
    });
    describe("nullOrUndefined", () => {
        it("valid (null)", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.nullOrUndefined());
            // act
            const result = arg_1.Arg.validate(target, null);
            // assert
            chai_1.assert.isTrue(result);
        });
        it("valid (undefined)", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.nullOrUndefined());
            // act
            const result = arg_1.Arg.validate(target, undefined);
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.nullOrUndefined());
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.nullOrUndefined());
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<null or undefined>`);
        });
    });
    describe("between", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.between(1, 3));
            // act
            const min = arg_1.Arg.validate(target, 1);
            const mid = arg_1.Arg.validate(target, 2);
            const max = arg_1.Arg.validate(target, 3);
            // assert
            chai_1.assert.isTrue(min);
            chai_1.assert.isTrue(mid);
            chai_1.assert.isTrue(max);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.between(1, 3));
            // act
            const before = arg_1.Arg.validate(target, 0);
            const after = arg_1.Arg.validate(target, 4);
            // assert
            chai_1.assert.isFalse(before);
            chai_1.assert.isFalse(after);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.between(1, 3));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<between 1 and 3>`);
        });
    });
    describe("in", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.in(["a", "b"]));
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.in(["a", "b"]));
            // act
            const result = arg_1.Arg.validate(target, "c");
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.in(["a", "b"]));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<in a, b>`);
        });
    });
    describe("notIn", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notIn(["a", "b"]));
            // act
            const result = arg_1.Arg.validate(target, "c");
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notIn(["a", "b"]));
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.notIn(["a", "b"]));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<not in a, b>`);
        });
    });
    describe("match", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.match(/^a$/));
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.match(/^a$/));
            // act
            const result = arg_1.Arg.validate(target, "b");
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.match(/^a$/));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<matches /^a$/>`);
        });
    });
    describe("typeof", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.typeof("number"));
            // act
            const result = arg_1.Arg.validate(target, 1);
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.typeof("number"));
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.typeof("number"));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<typeof number>`);
        });
    });
    describe("instanceof", () => {
        it("valid", () => {
            // arrange
            class C {
            }
            const target = arg_1.Arg.from(arg_1.Arg.instanceof(C));
            // act
            const result = arg_1.Arg.validate(target, new C());
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            class C {
            }
            const target = arg_1.Arg.from(arg_1.Arg.instanceof(C));
            // act
            const result = arg_1.Arg.validate(target, {});
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            class C {
            }
            const target = arg_1.Arg.from(arg_1.Arg.instanceof(C));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<instanceof C>`);
        });
    });
    describe("has", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.has("a"));
            // act
            const own = arg_1.Arg.validate(target, { a: 1 });
            const proto = arg_1.Arg.validate(target, { __proto__: { a: 1 } });
            // assert
            chai_1.assert.isTrue(own);
            chai_1.assert.isTrue(proto);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.has("a"));
            // act
            const result = arg_1.Arg.validate(target, { b: 1 });
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.has("a"));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<has a>`);
        });
    });
    describe("hasOwn", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.hasOwn("a"));
            // act
            const own = arg_1.Arg.validate(target, { a: 1 });
            // assert
            chai_1.assert.isTrue(own);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.hasOwn("a"));
            // act
            const result = arg_1.Arg.validate(target, { b: 1 });
            const proto = arg_1.Arg.validate(target, { __proto__: { a: 1 } });
            // assert
            chai_1.assert.isFalse(result);
            chai_1.assert.isFalse(proto);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from(arg_1.Arg.hasOwn("a"));
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<hasOwn a>`);
        });
    });
    describe("rest", () => {
        describe("no condition", () => {
            it("valid", () => {
                // arrange
                const target = arg_1.Arg.from(arg_1.Arg.rest());
                // act
                const empty = arg_1.Arg.validateAll([target], []);
                const multiple = arg_1.Arg.validateAll([target], ["a", "b"]);
                // assert
                chai_1.assert.isTrue(empty);
                chai_1.assert.isTrue(multiple);
            });
            it("toString", () => {
                // arrange
                const target = arg_1.Arg.from(arg_1.Arg.rest());
                // act
                const result = target.toString();
                // assert
                chai_1.assert.strictEqual(result, `<rest>`);
            });
        });
        describe("condition", () => {
            it("valid", () => {
                // arrange
                const target = arg_1.Arg.from(arg_1.Arg.rest(arg_1.Arg.typeof("string")));
                // act
                const empty = arg_1.Arg.validateAll([target], []);
                const multiple = arg_1.Arg.validateAll([target], ["a", "b"]);
                // assert
                chai_1.assert.isTrue(empty);
                chai_1.assert.isTrue(multiple);
            });
            it("invalid", () => {
                // arrange
                const target = arg_1.Arg.from(arg_1.Arg.rest(arg_1.Arg.typeof("string")));
                // act
                const result = arg_1.Arg.validateAll([target], ["a", 1]);
                // assert
                chai_1.assert.isFalse(result);
            });
            it("toString", () => {
                // arrange
                const target = arg_1.Arg.from(arg_1.Arg.rest(arg_1.Arg.typeof("string")));
                // act
                const result = target.toString();
                // assert
                chai_1.assert.strictEqual(result, `<rest typeof string>`);
            });
        });
    });
    describe("from", () => {
        it("valid", () => {
            // arrange
            const target = arg_1.Arg.from("a");
            // act
            const result = arg_1.Arg.validate(target, "a");
            // assert
            chai_1.assert.isTrue(result);
        });
        it("invalid", () => {
            // arrange
            const target = arg_1.Arg.from("a");
            // act
            const result = arg_1.Arg.validate(target, "b");
            // assert
            chai_1.assert.isFalse(result);
        });
        it("toString", () => {
            // arrange
            const target = arg_1.Arg.from("a");
            // act
            const result = target.toString();
            // assert
            chai_1.assert.strictEqual(result, `<"a">`);
        });
    });
});

//# sourceMappingURL=argTests.js.map
