import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";
import { ScriptTarget } from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: esDecorators", () => {
    const options: ts.CompilerOptions = { target: ts.ScriptTarget.ES2021 };
    const exec = (array: TemplateStringsArray) => evaluator.evaluateTypeScript(array[0], options);

    describe("target", () => {
        describe("for: class", () => {
            it("is initial constructor", () => {
                const { target, C } = exec`
                    export let target;
                    export @((t, c) => { target = t }) class C {
                    }
                `;
                assert.strictEqual(target, C);
            });
        });
        describe("for: method", () => {
            it("is initial method", () => {
                const { target, C } = exec`
                    export let target;
                    export class C {
                        @((t, c) => { target = t })
                        static method() {}
                    }
                `;
                assert.strictEqual(target, C.method);
            });
        });
        describe("for: getter", () => {
            it("is initial getter", () => {
                const { target, C } = exec`
                    export let target;
                    export class C {
                        @((t, c) => { target = t })
                        static get x() { return 1; }
                    }
                `;
                assert.strictEqual(target, Object.getOwnPropertyDescriptor(C, "x")!.get);
            });
        });
        describe("for: setter", () => {
            it("is initial setter", () => {
                const { target, C } = exec`
                    export let target;
                    export class C {
                        @((t, c) => { target = t })
                        static set x(v: number) { }
                    }
                `;
                assert.strictEqual(target, Object.getOwnPropertyDescriptor(C, "x")!.set);
            });
        });
        describe("for: field", () => {
            it("is undefined", () => {
                const { target } = exec`
                    export let target;
                    export class C {
                        @((t, c) => { target = t })
                        static x: number;
                    }
                `;
                assert.isUndefined(target);
            });
        });
        describe("for: auto-accessor", () => {
            it("is { get, set } for initial getter/setter", () => {
                const { target, C } = exec`
                    export let target;
                    export class C {
                        @((t, c) => { target = t })
                        static accessor x: number;
                    }
                `;
                assert.isObject(target);
                assert.deepEqual(Object.keys(target), ["get", "set"]);
                assert.strictEqual(target.get, Object.getOwnPropertyDescriptor(C, "x")!.get);
                assert.strictEqual(target.set, Object.getOwnPropertyDescriptor(C, "x")!.set);
            });
        });
    });

    describe("context", () => {
        describe("for: class", () => {
            it("is object", () => {
                const { context } = exec`
                    export let context;
                    export @((t, c) => { context = c; }) class C {
                    }
                `;
                assert.isObject(context);
            });
        });
        describe("for: method", () => {
            it("is object", () => {
                const { context } = exec`
                    export let context;
                    export class C {
                        @((t, c) => { context = c; })
                        static method() {}
                    }
                `;
                assert.isObject(context);
            });
        });
        describe("for: getter", () => {
            it("is object", () => {
                const { context } = exec`
                    export let context;
                    export class C {
                        @((t, c) => { context = c; })
                        static get x() { return 1; }
                    }
                `;
                assert.isObject(context);
            });
        });
        describe("for: setter", () => {
            it("is object", () => {
                const { context } = exec`
                    export let context;
                    export class C {
                        @((t, c) => { context = c; })
                        static set x(v: number) {}
                    }
                `;
                assert.isObject(context);
            });
        });
        describe("for: field", () => {
            it("is object", () => {
                const { context } = exec`
                    export let context;
                    export class C {
                        @((t, c) => { context = c; })
                        static x: number;
                    }
                `;
                assert.isObject(context);
            });
        });
        describe("for: auto-accessor", () => {
            it("is object", () => {
                const { context } = exec`
                    export let context;
                    export class C {
                        @((t, c) => { context = c; })
                        static accessor x: number;
                    }
                `;
                assert.isObject(context);
            });
        });
        describe(".kind", () => {
            describe("for: class", () => {
                it("is 'class'", () => {
                    const { context } = exec`
                        export let context;
                        export @((t, c) => { context = c; }) class C {
                        }
                    `;
                    assert.strictEqual(context.kind, "class");
                });
            });
            describe("for: method", () => {
                it("is 'method'", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.strictEqual(context.kind, "method");
                });
            });
            describe("for: getter", () => {
                it("is 'getter'", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.kind, "getter");
                });
            });
            describe("for: setter", () => {
                it("is 'setter'", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) {}
                        }
                    `;
                    assert.strictEqual(context.kind, "setter");
                });
            });
            describe("for: field", () => {
                it("is 'field'", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number;
                        }
                    `;
                    assert.strictEqual(context.kind, "field");
                });
            });
            describe("for: auto-accessor", () => {
                it("is 'accessor'", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number;
                        }
                    `;
                    assert.strictEqual(context.kind, "accessor");
                });
            });
        });
        describe(".name", () => {
            describe("for: class", () => {
                it("is initial class name", () => {
                    const { context } = exec`
                        export let context;
                        export @((t, c) => { context = c; }) class C {
                        }
                    `;
                    assert.strictEqual(context.name, "C");
                });
                it("is 'default' when initial class is unnamed default export", () => {
                    const { context } = exec`
                        export let context;
                        export default @((t, c) => { context = c; }) class {
                        }
                    `;
                    assert.strictEqual(context.name, "default");
                });
            });
            describe("for: method", () => {
                it("is initial method name string when identifier", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.strictEqual(context.name, "method");
                });
                it("is initial method name string when computed non-symbol", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static [1]() {}
                        }
                    `;
                    assert.strictEqual(context.name, "1");
                });
                it("is initial method name symbol when symbol", () => {
                    const { context, sym } = exec`
                        export const sym = Symbol();
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static [sym]() {}
                        }
                    `;
                    assert.strictEqual(context.name, sym);
                });
                it("is initial method name description string when private", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #method() {}
                        }
                    `;
                    assert.strictEqual(context.name, "#method");
                });
            });
            describe("for: getter", () => {
                it("is initial method name string when identifier", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.name, "x");
                });
                it("is initial method name string when computed non-symbol", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get [1]() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.name, "1");
                });
                it("is initial method name symbol when symbol", () => {
                    const { context, sym } = exec`
                        export const sym = Symbol();
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get [sym]() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.name, sym);
                });
                it("is initial method name description string when private", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get #x() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.name, "#x");
                });
            });
            describe("for: setter", () => {
                it("is initial method name string when identifier", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) { }
                        }
                    `;
                    assert.strictEqual(context.name, "x");
                });
                it("is initial method name string when computed non-symbol", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set [1](v: number) { }
                        }
                    `;
                    assert.strictEqual(context.name, "1");
                });
                it("is initial method name symbol when symbol", () => {
                    const { context, sym } = exec`
                        export const sym = Symbol();
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set [sym](v: number) { }
                        }
                    `;
                    assert.strictEqual(context.name, sym);
                });
                it("is initial method name description string when private", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set #x(v: number) { }
                        }
                    `;
                    assert.strictEqual(context.name, "#x");
                });
            });
            describe("for: field", () => {
                it("is initial field name string when identifier", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number;
                        }
                    `;
                    assert.strictEqual(context.name, "x");
                });
                it("is initial field name string when computed non-symbol", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static [1]: number;
                        }
                    `;
                    assert.strictEqual(context.name, "1");
                });
                it("is initial field name symbol when symbol", () => {
                    const { context, sym } = exec`
                        export const sym = Symbol();
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static [sym]: number;
                        }
                    `;
                    assert.strictEqual(context.name, sym);
                });
                it("is initial field name description string when private", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #x: number;
                        }
                    `;
                    assert.strictEqual(context.name, "#x");
                });
            });
            describe("for: auto-accessor", () => {
                it("is initial field name string when identifier", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number;
                        }
                    `;
                    assert.strictEqual(context.name, "x");
                });
                it("is initial field name string when computed non-symbol", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor [1]: number;
                        }
                    `;
                    assert.strictEqual(context.name, "1");
                });
                it("is initial field name symbol when symbol", () => {
                    const { context, sym } = exec`
                        export const sym = Symbol();
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor [sym]: number;
                        }
                    `;
                    assert.strictEqual(context.name, sym);
                });
                it("is initial field name description string when private", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor #x: number;
                        }
                    `;
                    assert.strictEqual(context.name, "#x");
                });
            });
        });
        describe(".static", () => {
            describe("for: class", () => {
                it("is not set", () => {
                    const { context } = exec`
                        export let context;
                        export @((t, c) => { context = c; }) class C {
                        }
                    `;
                    assert.doesNotHaveAnyKeys(context, ["static"]);
                });
            });
            describe("for: method", () => {
                it("when static: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.isTrue(context.static);
                });
                it("when instance: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            method() {}
                        }
                    `;
                    assert.isFalse(context.static);
                });
            });
            describe("for: getter", () => {
                it("when static: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.isTrue(context.static);
                });
                it("when instance: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            get x() { return 1; }
                        }
                    `;
                    assert.isFalse(context.static);
                });
            });
            describe("for: setter", () => {
                it("when static: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) {}
                        }
                    `;
                    assert.isTrue(context.static);
                });
                it("when instance: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            set x(v: number) {}
                        }
                    `;
                    assert.isFalse(context.static);
                });
            });
            describe("for: field", () => {
                it("when static: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number;
                        }
                    `;
                    assert.isTrue(context.static);
                });
                it("when instance: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            x: number;
                        }
                    `;
                    assert.isFalse(context.static);
                });
            });
            describe("for: auto-accessor", () => {
                it("when static: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number;
                        }
                    `;
                    assert.isTrue(context.static);
                });
                it("when instance: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            accessor x: number;
                        }
                    `;
                    assert.isFalse(context.static);
                });
            });
        });
        describe(".private", () => {
            describe("for: class", () => {
                it("is not set", () => {
                    const { context } = exec`
                        export let context;
                        export @((t, c) => { context = c; }) class C {}
                    `;
                    assert.doesNotHaveAnyKeys(context, ["private"]);
                });
            });
            describe("for: method", () => {
                it("when private: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            #method() {}
                        }
                    `;
                    assert.isTrue(context.private);
                });
                it("when public: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            method() {}
                        }
                    `;
                    assert.isFalse(context.private);
                });
            });
            describe("for: getter", () => {
                it("when private: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            get #x() { return 1; }
                        }
                    `;
                    assert.isTrue(context.private);
                });
                it("when public: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            get x() { return 1; }
                        }
                    `;
                    assert.isFalse(context.private);
                });
            });
            describe("for: setter", () => {
                it("when private: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            set #x(v: number) {}
                        }
                    `;
                    assert.isTrue(context.private);
                });
                it("when public: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            set x(v: number) {}
                        }
                    `;
                    assert.isFalse(context.private);
                });
            });
            describe("for: field", () => {
                it("when private: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            #x: number;
                        }
                    `;
                    assert.isTrue(context.private);
                });
                it("when public: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            x: number;
                        }
                    `;
                    assert.isFalse(context.private);
                });
            });
            describe("for: auto-accessor", () => {
                it("when private: is true", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            accessor #x: number;
                        }
                    `;
                    assert.isTrue(context.private);
                });
                it("when public: is false", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            accessor x: number;
                        }
                    `;
                    assert.isFalse(context.private);
                });
            });
        });
        // Disabled pending the outcome of https://github.com/tc39/proposal-decorators/issues/494
        describe(".access", () => {
            describe("for: class", () => {
                it("is not set", () => {
                    const { context } = exec`
                        export let context;
                        export @((t, c) => { context = c; }) class C {
                        }
                    `;
                    assert.doesNotHaveAnyKeys(context, ["access"]);
                });
            });
            describe("for: method", () => {
                it("is { has, get }", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.isObject(context.access);
                    assert.hasAllKeys(context.access, ["has", "get"]);
                    assert.isFunction(context.access.has);
                    assert.isFunction(context.access.get);
                });
                it("test public element presence via .has", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isTrue(context.access.has({ method() {} }));
                    assert.isFalse(context.access.has({}));
                });
                it("test private element presence via .has", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #method() {}
                        }
                        export class D {
                            static #method() {}
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isFalse(context.access.has(D));
                    assert.isFalse(context.access.has({}));
                });
                it("read public element of argument", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.strictEqual(context.access.get(C), C.method);
                    const obj = { method() {} };
                    assert.isTrue(context.access.has(obj));
                    assert.strictEqual(context.access.get(obj), obj.method);
                });
                it("read private element of argument", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #method() {}
                        }
                        export class D {
                            static #method() {}
                        }
                    `;
                    assert.isFunction(context.access.get(C));
                    assert.throws(() => context.access.get(D));
                    assert.throws(() => context.access.get({ ["#method"]() {} }));
                });
            });
            describe("for: getter", () => {
                it("is { has, get }", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.isObject(context.access);
                    assert.hasAllKeys(context.access, ["has", "get"]);
                    assert.isFunction(context.access.has);
                    assert.isFunction(context.access.get);
                });
                it("test public element presence via .has", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isTrue(context.access.has({
                        get x() {
                            return 2;
                        },
                    }));
                    assert.isFalse(context.access.has({}));
                });
                it("test private element presence via .has", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #method() {}
                        }
                        export class D {
                            static #method() {}
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isFalse(context.access.has(D));
                    assert.isFalse(context.access.has({}));
                });
                it("read public element of argument", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.access.get(C), 1);
                    assert.strictEqual(context.access.get({ x: 2 }), 2);
                });
                it("read private element of argument", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get #x() { return 1; }
                        }
                        export class D {
                            static get #x() { return 1; }
                        }
                    `;
                    assert.strictEqual(context.access.get(C), 1);
                    assert.throws(() => context.access.get(D));
                    assert.throws(() => context.access.get({ "#x": 2 }));
                });
            });
            describe("for: setter", () => {
                it("is { has, set }", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) {}
                        }
                    `;
                    assert.isObject(context.access);
                    assert.hasAllKeys(context.access, ["has", "set"]);
                    assert.isFunction(context.access.has);
                    assert.isFunction(context.access.set);
                });
                it("test public element presence via .has", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) { }
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isTrue(context.access.has({ x: 2 }));
                    assert.isFalse(context.access.has({}));
                });
                it("test private element presence via .has", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set #x(v: number) { }
                        }
                        export class D {
                            static set #x(v: number) { }
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isFalse(context.access.has(D));
                    assert.isFalse(context.access.has({ "#x": 2 }));
                });
                it("write public element of argument", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) { this.y = v; }
                            static y: number;
                        }
                    `;
                    context.access.set(C, 1);
                    assert.strictEqual(C.y, 1);

                    const obj = { x: 2 };
                    context.access.set(obj, 3);
                    assert.strictEqual(obj.x, 3);
                });
                it("write private element of argument", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set #x(v: number) {}
                        }
                        export class D {
                            static set #x(v: number) {}
                        }
                    `;
                    context.access.set(C, 1);
                    assert.throws(() => context.access.set(D, 3));
                    assert.throws(() => context.access.set({ "#x": 2 }, 3));
                });
            });
            describe("for: field", () => {
                it("is { has, get, set }", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number;
                        }
                    `;
                    assert.isObject(context.access);
                    assert.hasAllKeys(context.access, ["has", "get", "set"]);
                    assert.isFunction(context.access.has);
                    assert.isFunction(context.access.get);
                    assert.isFunction(context.access.set);
                });
                it("test public element presence via .has", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number = 1;
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isTrue(context.access.has({ x: 2 }));
                    assert.isFalse(context.access.has({}));
                });
                it("test private element presence via .has", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #x: number = 1;
                        }
                        export class D {
                            static #x: number = 1;
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isFalse(context.access.has(D));
                    assert.isFalse(context.access.has({ "#x": 2 }));
                });
                it("read/write public element of argument", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number = 1;
                        }
                    `;

                    assert.strictEqual(context.access.get(C), 1);
                    context.access.set(C, 2);
                    assert.strictEqual(C.x, 2);

                    const obj = { x: 2 };
                    assert.strictEqual(context.access.get(obj), 2);
                    context.access.set(obj, 3);
                    assert.strictEqual(obj.x, 3);
                });
                it("read/write private element of argument", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static #x: number = 1;
                            static getX() { return this.#x; }
                        }
                        export class D {
                            static #x: number = 1;
                        }
                    `;

                    assert.strictEqual(context.access.get(C), 1);
                    context.access.set(C, 2);
                    assert.strictEqual(C.getX(), 2);

                    assert.throws(() => context.access.get(D));
                    assert.throws(() => context.access.set(D, 3));

                    assert.throws(() => context.access.get({ "#x": 2 }));
                    assert.throws(() => context.access.set({ "#x": 2 }, 3));
                });
            });
            describe("for: auto-accessor", () => {
                it("is { has, get, set }", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number;
                        }
                    `;
                    assert.hasAllKeys(context.access, ["has", "get", "set"]);
                    assert.isFunction(context.access.has);
                    assert.isFunction(context.access.get);
                    assert.isFunction(context.access.set);
                });
                it("test public element presence via .has", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number = 1;
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isTrue(context.access.has({ x: 2 }));
                    assert.isFalse(context.access.has({}));
                });
                it("test private element presence via .has", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor #x: number = 1;
                        }
                        export class D {
                            static accessor #x: number = 1;
                        }
                    `;
                    assert.isTrue(context.access.has(C));
                    assert.isFalse(context.access.has(D));
                    assert.isFalse(context.access.has({ "#x": 2 }));
                });
                it("read/write public element of argument", () => {
                    const { context, C } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number = 1;
                        }
                    `;

                    assert.strictEqual(context.access.get(C), 1);
                    context.access.set(C, 2);
                    assert.strictEqual(C.x, 2);

                    const obj = { x: 2 };
                    assert.strictEqual(context.access.get(obj), 2);
                    context.access.set(obj, 3);
                    assert.strictEqual(obj.x, 3);
                });
                it("read/write private element of argument", () => {
                    const { context, C, D } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor #x: number = 1;
                            static getX() { return this.#x; }
                        }
                        export class D {
                            static accessor #x: number = 1;
                        }
                    `;

                    assert.strictEqual(context.access.get(C), 1);
                    context.access.set(C, 2);
                    assert.strictEqual(C.getX(), 2);

                    assert.throws(() => context.access.get(D));
                    assert.throws(() => context.access.set(D, 3));

                    assert.throws(() => context.access.get({ "#x": 2 }));
                    assert.throws(() => context.access.set({ "#x": 2 }, 3));
                });
            });
        });
        describe(".addInitializer", () => {
            describe("for: class", () => {
                it("is function", () => {
                    const { context } = exec`
                        export let context;
                        export @((t, c) => { context = c; }) class C {
                        }
                    `;
                    assert.isFunction(context.addInitializer);
                });
                it("can add multiple", () => {
                    const { order } = exec`
                        export const order = [];
                        export @((t, c) => {
                            c.addInitializer(() => { order.push("a"); });
                            c.addInitializer(() => { order.push("b"); });
                        }) class C {
                        }
                    `;
                    assert.deepEqual(order, ["a", "b"]);
                });
                it("argument must be function", () => {
                    // Currently underspecified. Proposed here: https://github.com/tc39/ecma262/pull/2417#discussion_r873163887
                    const { main } = exec`
                        export const main = value => {
                            @((t, c) => { c.addInitializer(value); }) class C {
                            }
                        };
                    `;
                    assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                    assert.throws(() => main(/*value*/ undefined));
                    assert.throws(() => main(123));
                    assert.throws(() => main("abc"));
                });
                it("cannot call after decoration", () => {
                    const { context } = exec`
                        export let context;
                        @((t, c) => { context = c; }) class C {
                        }
                    `;
                    assert.throws(() => context.addInitializer(() => {}));
                });
            });
            describe("for: method", () => {
                it("is function", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.isFunction(context.addInitializer);
                });
                it("can add multiple", () => {
                    const { order } = exec`
                        export const order = [];
                        export class C {
                            @((t, c) => {
                                c.addInitializer(() => { order.push("a"); });
                                c.addInitializer(() => { order.push("b"); });
                            })
                            static method() {}
                        }
                    `;
                    assert.deepEqual(order, ["a", "b"]);
                });
                it("argument must be function", () => {
                    // Currently underspecified. Proposed here: https://github.com/tc39/ecma262/pull/2417#discussion_r873163887
                    const { main } = exec`
                        export const main = value => {
                            class C {
                                @((t, c) => { c.addInitializer(value); })
                                static method() {}
                            }
                        };
                    `;
                    assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                    assert.throws(() => main(/*value*/ undefined));
                    assert.throws(() => main(123));
                    assert.throws(() => main("abc"));
                });
                it("cannot call after decoration", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static method() {}
                        }
                    `;
                    assert.throws(() => context.addInitializer(() => {}));
                });
                describe("when: static", () => {
                    it("extra initializers run once", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                static method() {}
                            }
                            export const main = () => { new C(); }
                        `;
                        main();
                        main();
                        assert.deepEqual(order, ["extra"]);
                    });
                });
                describe("when: instance", () => {
                    it("extra initializers run each time constructor runs", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                method() {}
                            }
                            export const main = () => { new C(); }
                        `;
                        assert.deepEqual(order, []);
                        main();
                        main();
                        assert.deepEqual(order, ["extra", "extra"]);
                    });
                });
            });
            describe("for: getter", () => {
                it("is function", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.isFunction(context.addInitializer);
                });
                it("can add multiple", () => {
                    const { order } = exec`
                        export const order = [];
                        export class C {
                            @((t, c) => {
                                c.addInitializer(() => { order.push("a"); });
                                c.addInitializer(() => { order.push("b"); });
                            })
                            static get x() { return 1; }
                        }
                    `;
                    assert.deepEqual(order, ["a", "b"]);
                });
                it("argument must be function", () => {
                    // Currently underspecified. Proposed here: https://github.com/tc39/ecma262/pull/2417#discussion_r873163887
                    const { main } = exec`
                        export const main = value => {
                            class C {
                                @((t, c) => { c.addInitializer(value); })
                                static get x() { return 1; }
                            }
                        };
                    `;
                    assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                    assert.throws(() => main(/*value*/ undefined));
                    assert.throws(() => main(123));
                    assert.throws(() => main("abc"));
                });
                it("cannot call after decoration", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static get x() { return 1; }
                        }
                    `;
                    assert.throws(() => context.addInitializer(() => {}));
                });
                describe("when: static", () => {
                    it("extra initializers run once", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                static get x() { return 1; }
                            }
                            export const main = () => { new C(); }
                        `;
                        main();
                        main();
                        assert.deepEqual(order, ["extra"]);
                    });
                });
                describe("when: instance", () => {
                    it("extra initializers run each time constructor runs", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                get x() { return 1; }
                            }
                            export const main = () => { new C(); }
                        `;
                        assert.deepEqual(order, []);
                        main();
                        main();
                        assert.deepEqual(order, ["extra", "extra"]);
                    });
                });
            });
            describe("for: setter", () => {
                it("is function", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) {}
                        }
                    `;
                    assert.isFunction(context.addInitializer);
                });
                it("can add multiple", () => {
                    const { order } = exec`
                        export const order = [];
                        export class C {
                            @((t, c) => {
                                c.addInitializer(() => { order.push("a"); });
                                c.addInitializer(() => { order.push("b"); });
                            })
                            static set x(v: number) {}
                        }
                    `;
                    assert.deepEqual(order, ["a", "b"]);
                });
                it("argument must be function", () => {
                    // Currently underspecified. Proposed here: https://github.com/tc39/ecma262/pull/2417#discussion_r873163887
                    const { main } = exec`
                        export const main = value => {
                            class C {
                                @((t, c) => { c.addInitializer(value); })
                                static set x(v: number) {}
                            }
                        };
                    `;
                    assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                    assert.throws(() => main(/*value*/ undefined));
                    assert.throws(() => main(123));
                    assert.throws(() => main("abc"));
                });
                it("cannot call after decoration", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static set x(v: number) {}
                        }
                    `;
                    assert.throws(() => context.addInitializer(() => {}));
                });
                describe("when: static", () => {
                    it("extra initializers run once", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                static set x(v: number) {}
                            }
                            export const main = () => { new C(); }
                        `;
                        main();
                        main();
                        assert.deepEqual(order, ["extra"]);
                    });
                });
                describe("when: instance", () => {
                    it("extra initializers run each time constructor runs", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                set x(v: number) {}
                            }
                            export const main = () => { new C(); }
                        `;
                        assert.deepEqual(order, []);
                        main();
                        main();
                        assert.deepEqual(order, ["extra", "extra"]);
                    });
                });
            });
            describe("for: field", () => {
                it("is function", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number;
                        }
                    `;
                    assert.isFunction(context.addInitializer);
                });
                it("can add multiple", () => {
                    const { order } = exec`
                        export const order = [];
                        export class C {
                            @((t, c) => {
                                c.addInitializer(() => { order.push("a"); });
                                c.addInitializer(() => { order.push("b"); });
                            })
                            static x: number;
                        }
                    `;
                    assert.deepEqual(order, ["a", "b"]);
                });
                it("argument must be function", () => {
                    // Currently underspecified. Proposed here: https://github.com/tc39/ecma262/pull/2417#discussion_r873163887
                    const { main } = exec`
                        export const main = value => {
                            class C {
                                @((t, c) => { c.addInitializer(value); })
                                static x: number;
                            }
                        };
                    `;
                    assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                    assert.throws(() => main(/*value*/ undefined));
                    assert.throws(() => main(123));
                    assert.throws(() => main("abc"));
                });
                it("cannot call after decoration", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static x: number;
                        }
                    `;
                    assert.throws(() => context.addInitializer(() => {}));
                });
                describe("when: static", () => {
                    it("extra initializers run once", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                static x: number;
                            }
                            export const main = () => { new C(); }
                        `;
                        main();
                        main();
                        assert.deepEqual(order, ["extra"]);
                    });
                });
                describe("when: instance", () => {
                    it("extra initializers run each time constructor runs", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                x: number;
                            }
                            export const main = () => { new C(); }
                        `;
                        assert.deepEqual(order, []);
                        main();
                        main();
                        assert.deepEqual(order, ["extra", "extra"]);
                    });
                });
            });
            describe("for: auto-accessor", () => {
                it("is function", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number;
                        }
                    `;
                    assert.isFunction(context.addInitializer);
                });
                it("can add multiple", () => {
                    const { order } = exec`
                        export const order = [];
                        export class C {
                            @((t, c) => {
                                c.addInitializer(() => { order.push("a"); });
                                c.addInitializer(() => { order.push("b"); });
                            })
                            static accessor x: number;
                        }
                    `;
                    assert.deepEqual(order, ["a", "b"]);
                });
                it("argument must be function", () => {
                    // Currently underspecified. Proposed here: https://github.com/tc39/ecma262/pull/2417#discussion_r873163887
                    const { main } = exec`
                        export const main = value => {
                            class C {
                                @((t, c) => { c.addInitializer(value); })
                                static accessor x: number;
                            }
                        };
                    `;
                    assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                    assert.throws(() => main(/*value*/ undefined));
                    assert.throws(() => main(123));
                    assert.throws(() => main("abc"));
                });
                it("cannot call after decoration", () => {
                    const { context } = exec`
                        export let context;
                        export class C {
                            @((t, c) => { context = c; })
                            static accessor x: number;
                        }
                    `;
                    assert.throws(() => context.addInitializer(() => {}));
                });
                describe("when: static", () => {
                    it("extra initializers run once", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                static accessor x: number;
                            }
                            export const main = () => { new C(); }
                        `;
                        main();
                        main();
                        assert.deepEqual(order, ["extra"]);
                    });
                });
                describe("when: instance", () => {
                    it("extra initializers run each time constructor runs", () => {
                        const { order, main } = exec`
                            export const order = [];
                            class C {
                                @((t, c) => { c.addInitializer(() => { order.push("extra"); }); })
                                accessor x: number;
                            }
                            export const main = () => { new C(); }
                        `;
                        assert.deepEqual(order, []);
                        main();
                        main();
                        assert.deepEqual(order, ["extra", "extra"]);
                    });
                });
            });
        });
    });

    describe("decorator evaluation", () => {
        describe("for: class", () => {
            it("may return undefined", () => {
                const { main } = exec`
                    export const main = () => {
                        @((t, c) => undefined) class C {
                        }
                    };
                `;
                assert.doesNotThrow(main);
            });
            it("may return a different function", () => {
                const { C1, C2 } = exec`
                    export class C1 {}
                    export @((t, c) => C1) class C2 {
                    }
                `;
                assert.strictEqual(C2, C1);
            });
            it("may not return non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        @((t, c) => value) class C2 {
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
            describe("redirects private static", () => {
                it("when: field", () => {
                    const { C } = exec`
                        export @((t: any, c): any => class extends t {}) class C {
                            static #x = 1;
                            static g() {
                                this.#x = this.#x + 1;
                                this.#x++;
                                return this.#x;
                            }
                        }
                    `;
                    assert.strictEqual(C.g(), 3);
                });
            });
        });
        describe("for: method", () => {
            it("may return undefined", () => {
                const { main } = exec`
                    export const main = () => {
                        class C {
                            @((t, c) => undefined)
                            static method() {}
                        }
                    };
                `;
                assert.doesNotThrow(main);
            });
            it("may return a different function", () => {
                const { C, replacement } = exec`
                    export function replacement() {}
                    export class C {
                        @((t, c) => replacement) method() {}
                    }
                `;
                assert.strictEqual(C.prototype.method, replacement);
            });
            it("may not return non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => value) method() {}
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
        });
        describe("for: getter", () => {
            it("may return undefined", () => {
                const { main } = exec`
                    export const main = () => {
                        class C {
                            @((t, c) => undefined)
                            static get x() { return 1; }
                        }
                    };
                `;
                assert.doesNotThrow(main);
            });
            it("may return a different function", () => {
                const { C, replacement } = exec`
                    export function replacement() { return 2; }
                    export class C {
                        @((t, c) => replacement)
                        static get x() { return 1; }
                    }
                `;
                assert.strictEqual(Object.getOwnPropertyDescriptor(C, "x")!.get, replacement);
            });
            it("may not return non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => value)
                            get x() { return 1; }
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
        });
        describe("for: setter", () => {
            it("may return undefined", () => {
                const { main } = exec`
                    export const main = () => {
                        class C {
                            @((t, c) => undefined)
                            static set x(v: number) {}
                        }
                    };
                `;
                assert.doesNotThrow(main);
            });
            it("may return a different function", () => {
                const { C, replacement } = exec`
                    export function replacement() { return 2; }
                    export class C {
                        @((t, c) => replacement)
                        static set x(v: number) {}
                    }
                `;
                assert.strictEqual(Object.getOwnPropertyDescriptor(C, "x")!.set, replacement);
            });
            it("may not return non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => value)
                            static set x(v: number) {}
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
        });
        describe("for: field", () => {
            it("may return undefined", () => {
                const { main } = exec`
                    export const main = () => {
                        class C {
                            @((t, c) => undefined)
                            static x: number;
                        }
                    };
                `;
                assert.doesNotThrow(main);
            });
            it("may return function to inject initializer pipe-through function", () => {
                const { C } = exec`
                    export class C {
                        @((t, c) => x => x + 1)
                        static x: number = 1;
                    }
                `;
                assert.strictEqual(C.x, 2);
            });
            it("undefined initializer works", () => {
                const { C } = exec`
                    export class C {
                        @((t, c) => () => 2)
                        static x: any;
                    }
                `;
                assert.strictEqual(C.x, 2);
            });
            it("multiple initializer pipe-throughs applied in order", () => {
                const { C } = exec`
                    export class C {
                        @((t, c) => x => [...x, 2])
                        @((t, c) => x => [...x, 3])
                        static x: number[] = [1];
                    }
                `;
                assert.deepEqual(C.x, [1, 2, 3]);
            });
            it("may not return non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => value)
                            static x: number;
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
        });
        describe("for: auto-accessor", () => {
            it("may return undefined", () => {
                const { main } = exec`
                    export const main = () => {
                        class C {
                            @((t, c) => undefined)
                            static accessor x: number;
                        }
                    };
                `;
                assert.doesNotThrow(main);
            });
            it("may return { get } to replace getter", () => {
                const { C, replacement } = exec`
                    export function replacement() { return 2; }
                    export class C {
                        @((t, c) => ({ get: replacement }))
                        static accessor x: number;
                    }
                `;
                assert.strictEqual(Object.getOwnPropertyDescriptor(C, "x")!.get, replacement);
                assert.isFunction(Object.getOwnPropertyDescriptor(C, "x")!.set);
            });
            it("may return { set } to replace setter", () => {
                const { C, replacement } = exec`
                    export function replacement(v: number) { }
                    export class C {
                        @((t, c) => ({ set: replacement }))
                        static accessor x: number;
                    }
                `;
                assert.strictEqual(Object.getOwnPropertyDescriptor(C, "x")!.set, replacement);
                assert.isFunction(Object.getOwnPropertyDescriptor(C, "x")!.get);
            });
            it("may return { init } to inject initializer pipe-through function ", () => {
                const { C } = exec`
                    export class C {
                        @((t, c) => ({ init: x => x + 1 }))
                        static accessor x: number = 1;
                    }
                `;
                assert.strictEqual(C.x, 2);
            });
            it("multiple init pipe-throughs applied in order", () => {
                const { C } = exec`
                    export class C {
                        @((t, c) => ({ init: x => [...x, 2] }))
                        @((t, c) => ({ init: x => [...x, 3] }))
                        static accessor x: number[] = [1];
                    }
                `;
                assert.deepEqual(C.x, [1, 2, 3]);
            });
            it("may not return non-object, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => value)
                            static accessor x: number;
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
            it("may not return { get } with non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => ({ get: value }))
                            static accessor x: number;
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
            it("may not return { set } with non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => ({ set: value }))
                            static accessor x: number;
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
            it("may not return { init } with non-function, non-undefined", () => {
                const { main } = exec`
                    export const main = value => {
                        class C {
                            @((t, c) => ({ init: value }))
                            static accessor x: number;
                        }
                    };
                `;
                assert.throws(() => main(/*value*/ null)); // eslint-disable-line no-restricted-syntax
                assert.throws(() => main(1));
                assert.throws(() => main("abc"));
            });
        });
        it("accessor 'init' evaluation order (#54267)", () => {
            const { main } = exec`
                function minusTwo({ set }: any, ctx: any) {
                    return {
                        set(v) { set.call(this, v - 2); },
                        init(v) { return v - 2; },
                    };
                }

                function timesFour({ set }: any, ctx: any) {
                    return {
                        set(v) { set.call(this, v * 4); },
                        init(v) { return v * 4; }
                    };
                }

                class C {
                    @minusTwo @timesFour accessor x = 5;
                }

                export const main = () => {
                    const obj = new C();
                    const afterInit = obj.x;
                    obj.x = 5;
                    const afterSet = obj.x;
                    return { afterInit, afterSet };
                };
            `;
            const { afterInit, afterSet } = main();
            assert.strictEqual(afterInit, 12);
            assert.strictEqual(afterSet, 12);
        });
    });

    const nodeVersion = new ts.Version(process.versions.node);
    const supportsClassStaticBlock = nodeVersion.major >= 16;

    const targets = [
        // NOTE: Class static blocks weren't supported in Node v14
        ...(supportsClassStaticBlock ? [ScriptTarget.ES2022] : []),
        ScriptTarget.ES2021,
        ScriptTarget.ES2015,
    ];

    for (const target of targets) {
        const targetName = ts.Debug.formatEnum(target, (ts as any).ScriptTarget);
        const options: ts.CompilerOptions = { target };
        const exec = (array: TemplateStringsArray) => evaluator.evaluateTypeScript(array[0], options);

        it(`class definition evaluation order (${targetName})`, () => {
            const { order } = exec`
                export const order = [];

                class Base {
                    constructor() {
                        order.push("superclass construction");
                    }
                }

                @(order.push("class decorator evaluation 1"), ((t, c) => {
                    order.push("class decorator application 1");
                    c.addInitializer(() => {
                        order.push("class extra initializer evaluation 1a");
                    });
                    c.addInitializer(() => {
                        order.push("class extra initializer evaluation 1b");
                    });
                }))
                @(order.push("class decorator evaluation 2"), ((t, c) => {
                    order.push("class decorator application 2");
                    c.addInitializer(() => {
                        order.push("class extra initializer evaluation 2a");
                    });
                    c.addInitializer(() => {
                        order.push("class extra initializer evaluation 2b");
                    });
                }))
                class Derived extends (order.push("heritage clause evaluation"), Base) {
                    static {
                        order.push("static block evaluation");
                    }

                    @(order.push("static field decorator evaluation 1"), ((t, c) => {
                        order.push("static field decorator application 1");
                        c.addInitializer(() => {
                            order.push("static field extra initializer evaluation 1a");
                        });
                        c.addInitializer(() => {
                            order.push("static field extra initializer evaluation 1b");
                        });
                        return x => {
                            order.push("static field injected initializer evaluation 1");
                            return x;
                        };
                    }))
                    @(order.push("static field decorator evaluation 2"), ((t, c) => {
                        order.push("static field decorator application 2");
                        c.addInitializer(() => {
                            order.push("static field extra initializer evaluation 2a");
                        });
                        c.addInitializer(() => {
                            order.push("static field extra initializer evaluation 2b");
                        });
                        return x => {
                            order.push("static field injected initializer evaluation 2");
                            return x;
                        };
                    }))
                    static z = order.push("static field initializer evaluation");

                    static [(order.push("static computed property name evaluation"), "y")]() {}

                    @(order.push("instance field decorator evaluation 1"), ((t, c) => {
                        order.push("instance field decorator application 1");
                        c.addInitializer(() => {
                            order.push("instance field extra initializer evaluation 1a");
                        });
                        c.addInitializer(() => {
                            order.push("instance field extra initializer evaluation 1b");
                        });
                        return x => {
                            order.push("instance field injected initializer evaluation 1");
                            return x;
                        };
                    }))
                    @(order.push("instance field decorator evaluation 2"), ((t, c) => {
                        order.push("instance field decorator application 2");
                        c.addInitializer(() => {
                            order.push("instance field extra initializer evaluation 2a");
                        });
                        c.addInitializer(() => {
                            order.push("instance field extra initializer evaluation 2b");
                        });
                        return x => {
                            order.push("instance field injected initializer evaluation 2");
                            return x;
                        };
                    }))
                    a = order.push("instance field initializer evaluation");

                    [(order.push("instance computed property name evaluation"), "b")]() {}

                    constructor() {
                        order.push("pre-super constructor evaluation");
                        super();
                        order.push("post-super constructor evaluation");
                    }

                    @(order.push("static method decorator evaluation 1"), ((t, c) => {
                        order.push("static method decorator application 1");
                        c.addInitializer(() => {
                            order.push("static method extra initializer evaluation 1a");
                        });
                        c.addInitializer(() => {
                            order.push("static method extra initializer evaluation 1b");
                        });
                    }))
                    @(order.push("static method decorator evaluation 2"), ((t, c) => {
                        order.push("static method decorator application 2");
                        c.addInitializer(() => {
                            order.push("static method extra initializer evaluation 2a");
                        });
                        c.addInitializer(() => {
                            order.push("static method extra initializer evaluation 2b");
                        });
                    }))
                    static x() {}

                    @(order.push("static auto-accessor decorator evaluation 1"), ((t, c) => {
                        order.push("static auto-accessor decorator application 1");
                        c.addInitializer(() => {
                            order.push("static auto-accessor extra initializer evaluation 1a");
                        });
                        c.addInitializer(() => {
                            order.push("static auto-accessor extra initializer evaluation 1b");
                        });
                        return {
                            init: x => {
                                order.push("static auto-accessor injected initializer evaluation 1");
                                return x;
                            }
                        };
                    }))
                    @(order.push("static auto-accessor decorator evaluation 2"), ((t, c) => {
                        order.push("static auto-accessor decorator application 2");
                        c.addInitializer(() => {
                            order.push("static auto-accessor extra initializer evaluation 2a");
                        });
                        c.addInitializer(() => {
                            order.push("static auto-accessor extra initializer evaluation 2b");
                        });
                        return {
                            init: x => {
                                order.push("static auto-accessor injected initializer evaluation 2");
                                return x;
                            }
                        };
                    }))
                    static accessor w = order.push("static auto-accessor initializer evaluation");

                    @(order.push("instance method decorator evaluation 1"), ((t, c) => {
                        order.push("instance method decorator application 1");
                        c.addInitializer(() => {
                            order.push("instance method extra initializer evaluation 1a");
                        });
                        c.addInitializer(() => {
                            order.push("instance method extra initializer evaluation 1b");
                        });
                    }))
                    @(order.push("instance method decorator evaluation 2"), ((t, c) => {
                        order.push("instance method decorator application 2");
                        c.addInitializer(() => {
                            order.push("instance method extra initializer evaluation 2a");
                        });
                        c.addInitializer(() => {
                            order.push("instance method extra initializer evaluation 2b");
                        });
                    }))
                    c() {}

                    @(order.push("instance auto-accessor decorator evaluation 1"), ((t, c) => {
                        order.push("instance auto-accessor decorator application 1");
                        c.addInitializer(() => {
                            order.push("instance auto-accessor extra initializer evaluation 1a");
                        });
                        c.addInitializer(() => {
                            order.push("instance auto-accessor extra initializer evaluation 1b");
                        });
                        return {
                            init: x => {
                                order.push("instance auto-accessor injected initializer evaluation 1");
                                return x;
                            }
                        };
                    }))
                    @(order.push("instance auto-accessor decorator evaluation 2"), ((t, c) => {
                        order.push("instance auto-accessor decorator application 2");
                        c.addInitializer(() => {
                            order.push("instance auto-accessor extra initializer evaluation 2a");
                        });
                        c.addInitializer(() => {
                            order.push("instance auto-accessor extra initializer evaluation 2b");
                        });
                        return {
                            init: x => {
                                order.push("instance auto-accessor injected initializer evaluation 2");
                                return x;
                            }
                        };
                    }))
                    accessor d = order.push("instance auto-accessor initializer evaluation");
                }

                order.push("instance construction");
                new Derived();
                order.push("done");
            `;

            // TODO: static private method and field evaluation order when that is supported.
            assert.deepEqual(order, [
                // first, we evaluate the class decorator expressions and heritage clause in document order:
                "class decorator evaluation 1",
                "class decorator evaluation 2",
                "heritage clause evaluation",

                // next, we evaluate decorators interleaved with computed property names in document order:
                "static field decorator evaluation 1",
                "static field decorator evaluation 2",
                "static computed property name evaluation",
                "instance field decorator evaluation 1",
                "instance field decorator evaluation 2",
                "instance computed property name evaluation",
                "static method decorator evaluation 1",
                "static method decorator evaluation 2",
                "static auto-accessor decorator evaluation 1",
                "static auto-accessor decorator evaluation 2",
                "instance method decorator evaluation 1",
                "instance method decorator evaluation 2",
                "instance auto-accessor decorator evaluation 1",
                "instance auto-accessor decorator evaluation 2",
                // NOTE: at this point, all of the class elements have been collected.

                // next, for each static method, in document order, we apply that method's decorators in reverse order:
                "static method decorator application 2",
                "static method decorator application 1",
                "static auto-accessor decorator application 2",
                "static auto-accessor decorator application 1",
                // NOTE: at this point, all non-private static methods are defined on the class.

                // next, for each instance method, in document order, we apply that method's decorators in reverse order:
                "instance method decorator application 2",
                "instance method decorator application 1",
                "instance auto-accessor decorator application 2",
                "instance auto-accessor decorator application 1",
                // NOTE: at this point, all non-private instance methods are defined on the prototype.

                // next, for each static field, in document order, we apply that field's decorators in reverse order:
                "static field decorator application 2",
                "static field decorator application 1",
                // NOTE: at this point, static fields have not yet been applied

                // next, for each instance field, in document order, we apply that field's decorators in reverse order:
                "instance field decorator application 2",
                "instance field decorator application 1",
                // NOTE: at this point, instance fields have not yet been applied

                // next, apply class decorators in reverse order:
                "class decorator application 2",
                "class decorator application 1",
                // NOTE: at this point, any constructor replacement has occurred.
                // NOTE: at this point the local class binding (i.e., the class name) has been initialized and can be
                //       referenced
                // NOTE: at this point, static private methods will be installed (TODO: on the replacement class)

                // next, static extra initializers are applied in the order they were added (i.e., methods before fields,
                // reverse order of decorator evaluation) and are applied to the replacement class.
                "static method extra initializer evaluation 2a",
                "static method extra initializer evaluation 2b",
                "static method extra initializer evaluation 1a",
                "static method extra initializer evaluation 1b",

                // next, static initializers (i.e., fields, auto-accessors, and static blocks) are evaluated in document
                // order and applied to the replacement class:
                "static block evaluation",
                "static field initializer evaluation",
                "static field injected initializer evaluation 1",
                "static field injected initializer evaluation 2",
                "static field extra initializer evaluation 2a",
                "static field extra initializer evaluation 2b",
                "static field extra initializer evaluation 1a",
                "static field extra initializer evaluation 1b",

                "static auto-accessor initializer evaluation",
                "static auto-accessor injected initializer evaluation 1",
                "static auto-accessor injected initializer evaluation 2",
                "static auto-accessor extra initializer evaluation 2a",
                "static auto-accessor extra initializer evaluation 2b",
                "static auto-accessor extra initializer evaluation 1a",
                "static auto-accessor extra initializer evaluation 1b",
                // NOTE: at this point, static private fields will be installed (TODO: on the replacement class)

                // finally, class extra initializers are applied in the order they were added (i.e., methods before fields,
                // reverse order of decorator evaluation).
                "class extra initializer evaluation 2a",
                "class extra initializer evaluation 2b",
                "class extra initializer evaluation 1a",
                "class extra initializer evaluation 1b",
                // NOTE: at this point, class definition evaluation has finished.

                // now we move on to construction:
                "instance construction",

                // first, statements before `super()` are evaluated:
                "pre-super constructor evaluation",
                // NOTE: at this point `this` is still not yet bound.

                // next, statements in the superclass constructor are evaluated:
                "superclass construction",
                // NOTE: as we return from the `super()` call, we start instance field initialization.
                // NOTE: at this point, `this` is bound.
                // NOTE: at this point, instance private methods are installed.

                // next, instance extra initializers are applied in the order they were added (i.e., methods before fields,
                // reverse order of decorator evaluation).
                "instance method extra initializer evaluation 2a",
                "instance method extra initializer evaluation 2b",
                "instance method extra initializer evaluation 1a",
                "instance method extra initializer evaluation 1b",

                // next, instance initializers (i.e., fields, auto-accessors, and static blocks) are evaluated in document
                // order:
                "instance field initializer evaluation",
                "instance field injected initializer evaluation 1",
                "instance field injected initializer evaluation 2",
                "instance field extra initializer evaluation 2a",
                "instance field extra initializer evaluation 2b",
                "instance field extra initializer evaluation 1a",
                "instance field extra initializer evaluation 1b",
                "instance auto-accessor initializer evaluation",
                "instance auto-accessor injected initializer evaluation 1",
                "instance auto-accessor injected initializer evaluation 2",
                "instance auto-accessor extra initializer evaluation 2a",
                "instance auto-accessor extra initializer evaluation 2b",
                "instance auto-accessor extra initializer evaluation 1a",
                "instance auto-accessor extra initializer evaluation 1b",
                // NOTE: at this point, instance private fields will be installed.

                // finally, statements in the constructor after the call to `super()` are evaluated:
                "post-super constructor evaluation",

                // and now evaluation has completed:
                "done",
            ]);
        });

        describe("examples", () => {
            // see https://github.com/tc39/proposal-decorators#classes
            it(`@logged (${targetName})`, () => {
                const { output } = exec`
                    export const output: string[] = [];

                    function log(s: string) {
                        output.push(s);
                    }

                    function logged<T extends abstract new (...args: any) => any>(target: T, context: ClassDecoratorContext<T>): T | void;
                    function logged<This, T extends (this: This, ...args: any) => any>(target: T, context: ClassMethodDecoratorContext<This, T>): T | void;
                    function logged<This, T>(target: (this: This) => T, context: ClassGetterDecoratorContext<This, T>): (this: This) => T;
                    function logged<This, T>(target: (this: This, value: T) => void, context: ClassSetterDecoratorContext<This, T>): (this: This, value: T) => void;
                    function logged<This, T>(target: ClassAccessorDecoratorTarget<This, T>, context: ClassAccessorDecoratorContext<This, T>): ClassAccessorDecoratorResult<This, T> | void;
                    function logged(target: any, context: DecoratorContext): any {
                        switch (context.kind) {
                            case "class": {
                                const name = context.name ?? "(anonymous)";
                                return class extends target {
                                    constructor(...args: any) {
                                        log("constructor " + name + " enter");
                                        try {
                                            super(...args);
                                        }
                                        finally {
                                            log("constructor " + name + " exit");
                                        }
                                    }
                                };
                            }
                            case "method":
                            case "getter":
                            case "setter": {
                                const name = context.name.toString();
                                const kind = context.kind;
                                return function (this: any, ...args: any) {
                                    log(kind + " " + name + " enter");
                                    try {
                                        return target.apply(this, args);
                                    }
                                    finally {
                                        log(kind + " " + name + " exit");
                                    }
                                }
                            }
                            case "accessor": {
                                const name = context.name.toString();
                                return {
                                    get: function (this: any) {
                                        log("accessor(get) " + name + " enter");
                                        try {
                                            return target.get.call(this);
                                        }
                                        finally {
                                            log("accessor(get) " + name + " exit");
                                        }
                                    },
                                    set: function (this: any, value: any) {
                                        log("accessor(set) " + name + " enter");
                                        try {
                                            target.set.call(this, value);
                                        }
                                        finally {
                                            log("accessor(set) " + name + " exit");
                                        }
                                    }
                                };
                            }
                            default:
                                throw new TypeError("Not supported");
                        }
                    }

                    @logged
                    class C {
                        constructor() {
                            log("C body");
                        }

                        @logged m() {
                            log("m body");
                        }

                        @logged get x() {
                            log("get x body");
                            return 0;
                        }

                        @logged set y(value: number) {
                            log("set y body");
                        }

                        @logged accessor z = 0;
                    }

                    const obj = new C();
                    obj.m();
                    obj.x;
                    obj.y = 1;
                    obj.z = 2;
                `;

                assert.deepEqual(output, [
                    "constructor C enter",
                    "C body",
                    "constructor C exit",
                    "method m enter",
                    "m body",
                    "method m exit",
                    "getter x enter",
                    "get x body",
                    "getter x exit",
                    "setter y enter",
                    "set y body",
                    "setter y exit",
                    "accessor(set) z enter",
                    "accessor(set) z exit",
                ]);
            });

            // see https://github.com/tc39/proposal-decorators#example-bound
            it(`@bound (${targetName})`, () => {
                const { output } = exec`
                    export const output: string[] = [];

                    type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;
                    type Method<This, A extends any[], T> = (this: This, ...args: A) => T;

                    function bound<This, A extends any[], T, K extends MatchingKeys<This, Method<This, A, T>>>(
                        target: Method<This, A, T>,
                        { addInitializer, name }: Omit<ClassMethodDecoratorContext<This, Method<This, A, T>>, "name"> & { name: K, private: false }
                    ): void {
                        addInitializer(function (this: This) {
                            const method = this[name] as Method<This, A, T>;
                            const boundMethod = method.bind(this) as Method<undefined, A, T>;
                            this[name] = boundMethod as typeof this[K];
                        });
                    }

                    class C {
                        constructor(private message: string) {}

                        @bound speak() {
                            output.push(this.message);
                        }
                    }

                    const { speak } = new C("test");
                    speak();
                `;

                assert.deepEqual(output, ["test"]);
            });

            // see https://github.com/tc39/proposal-decorators#access-and-metadata-sidechanneling
            it(`dependency injection (${targetName})`, () => {
                const { result } = exec`
                    const INJECTIONS = new WeakMap<object, { injectionKey: string, set: (object: any, value: any) => void }[]>();

                    function createInjections() {
                        const injections: { injectionKey: string, set: (object: any, value: any) => void }[] = [];

                        function injectable<T extends new (...args: any) => any>(Class: T, context: ClassDecoratorContext<T>) {
                            INJECTIONS.set(Class, injections);
                        }

                        function inject(injectionKey: string) {
                            return function applyInjection(v: undefined, context: ClassFieldDecoratorContext<any, any>) {
                                injections.push({ injectionKey, set: context.access.set });
                            };
                        }

                        return { injectable, inject };
                    }

                    class Container {
                        registry = new Map();

                        register(injectionKey: string, value: any) {
                            this.registry.set(injectionKey, value);
                        }

                        lookup(injectionKey: string) {
                            return this.registry.get(injectionKey);
                        }

                        create<T extends new (...args: any) => any>(Class: T) {
                            let instance = new Class();

                            for (const { injectionKey, set } of INJECTIONS.get(Class) || []) {
                                set(instance, this.lookup(injectionKey));
                            }

                            return instance;
                        }
                    }

                    class Store {}

                    const { injectable, inject } = createInjections();

                    @injectable
                    class C {
                        @inject('store') store!: Store;
                    }

                    let container = new Container();
                    let store = new Store();

                    container.register('store', store);

                    let c = container.create(C);

                    export const result = c.store === store;
                `;
                assert.isTrue(result);
            });
        });
    }
});
