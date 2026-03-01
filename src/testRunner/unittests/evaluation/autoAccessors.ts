import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: autoAccessors", () => {
    const editions = [
        { name: "es2022", target: ts.ScriptTarget.ES2022 },
        { name: "es2015", target: ts.ScriptTarget.ES2015 },
    ];
    for (const { name, target } of editions) {
        describe(name, () => {
            it("generates accessor pair", async () => {
                const { C } = evaluator.evaluateTypeScript(
                    `
                    export class C {
                        accessor x;
                    }
                `,
                    { target },
                );

                const desc = Object.getOwnPropertyDescriptor(C.prototype, "x");
                assert.isDefined(desc);
                assert.isFunction(desc.get);
                assert.isFunction(desc.set);
            });

            it("storage is private", async () => {
                const { C } = evaluator.evaluateTypeScript(
                    `
                    export class C {
                        accessor x;
                    }
                `,
                    { target },
                );

                const desc = Object.getOwnPropertyDescriptor(C.prototype, "x");
                const obj = Object.create(C.prototype);
                assert.throws(() => desc!.get!.call(obj), /private/);
            });

            it("getter and setter wrap same field", async () => {
                const { C } = evaluator.evaluateTypeScript(
                    `
                    export class C {
                        accessor x;
                    }
                `,
                    { target },
                );
                const obj = new C();
                obj.x = 1;
                assert.equal(obj.x, 1);

                obj.x = 2;
                assert.equal(obj.x, 2);
            });

            it("supports initializer", async () => {
                const { C } = evaluator.evaluateTypeScript(
                    `
                    export class C {
                        accessor x = 1;
                    }
                `,
                    { target },
                );
                const obj = new C();
                assert.equal(obj.x, 1);
            });

            it("legacy decorator can intercept getter/setter", async () => {
                const { actions, C } = evaluator.evaluateTypeScript(
                    `
                    function dec(target, key, descriptor) {
                        const { get, set } = descriptor;
                        actions.push({ kind: "decorate", target, key });
                        descriptor.get = function() {
                            actions.push({ kind: "get", this: this });
                            return get.call(this);
                        };
                        descriptor.set = function(value) {
                            actions.push({ kind: "set", this: this, value });
                            set.call(this, value);
                        };
                    }
                    export const actions = [];
                    export class C {
                        @dec
                        accessor x;
                    }
                `,
                    { target, experimentalDecorators: true },
                );

                assert.deepEqual(actions, [
                    { kind: "decorate", target: C.prototype, key: "x" },
                ]);
                const obj = new C();
                obj.x = 1;
                assert.equal(obj.x, 1);
                assert.deepEqual(actions, [
                    { kind: "decorate", target: C.prototype, key: "x" },
                    { kind: "set", this: obj, value: 1 },
                    { kind: "get", this: obj },
                ]);
            });

            it("legacy decorator cannot intercept initializer", async () => {
                const { actions, C } = evaluator.evaluateTypeScript(
                    `
                    function dec(target, key, descriptor) {
                        const { get, set } = descriptor;
                        descriptor.set = function(value) {
                            actions.push({ kind: "set", this: this, value });
                            set.call(this, value);
                        };
                    }
                    export const actions = [];
                    export class C {
                        @dec
                        accessor x = 1;
                    }
                `,
                    { target, experimentalDecorators: true },
                );

                const obj = new C();
                assert.equal(obj.x, 1);
                assert.deepEqual(actions, []);
            });
        });
    }
});
