import * as evaluator from "../../_namespaces/evaluator.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: evaluation:: superInStaticInitializer", () => {
    it("super-property-get in es2015", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                class Base {
                    static x = 1;
                }
                class Derived extends Base {
                    static y = super.x;
                }
                return [
                    Base,
                    Derived
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Base, Derived] = result.main();
        assert.strictEqual(Base.x, 1);
        assert.strictEqual(Derived.y, 1);
    });
    it("super-property-set in es2015", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                class Base {
                    static x = 1;
                }
                class Derived extends Base {
                    static y = super.x++;
                }
                return [
                    Base,
                    Derived
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Base, Derived] = result.main();
        assert.strictEqual(Base.x, 1);
        assert.strictEqual(Derived.x, 2);
        assert.strictEqual(Derived.y, 1);
    });
    it("super-accessor-get in es2015", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                let thisInBase;
                class Base {
                    static _x = 1;
                    static get x() {
                        thisInBase = this;
                        return this._x;
                    }
                }
                class Derived extends Base {
                    static y = super.x;
                }
                return [
                    Base,
                    Derived,
                    thisInBase
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Base, Derived, thisInBase] = result.main();
        assert.strictEqual(Base._x, 1);
        assert.strictEqual(Derived.y, 1);
        assert.strictEqual(thisInBase, Derived);
    });
    it("super-accessor-set in es2015", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                let thisInBaseGet;
                let thisInBaseSet;
                class Base {
                    static _x = 1;
                    static get x() {
                        thisInBaseGet = this;
                        return this._x;
                    }
                    static set x(value) {
                        thisInBaseSet = this;
                        this._x = value;
                    }
                }
                class Derived extends Base {
                    static y = super.x++;
                }
                return [
                    Base,
                    Derived,
                    thisInBaseGet,
                    thisInBaseSet
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Base, Derived, thisInBaseGet, thisInBaseSet] = result.main();
        assert.strictEqual(Base._x, 1);
        assert.strictEqual(Derived._x, 2);
        assert.strictEqual(Derived.y, 1);
        assert.strictEqual(thisInBaseGet, Derived);
        assert.strictEqual(thisInBaseSet, Derived);
    });
    it("super-call in es2015", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                let thisInBase;
                class Base {
                    static x() {
                        thisInBase = this;
                        return 1;
                    }
                }
                class Derived extends Base {
                    static y = super.x();
                }
                return [
                    Derived,
                    thisInBase,
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Derived, thisInBase] = result.main();
        assert.strictEqual(Derived.y, 1);
        assert.strictEqual(thisInBase, Derived);
    });
    it("super-call in es5", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                let thisInBase;
                class Base {
                    static x() {
                        thisInBase = this;
                        return 1;
                    }
                }
                class Derived extends Base {
                    static y = super.x();
                }
                return [
                    Derived,
                    thisInBase,
                ];
            }
        `,
            { target: ts.ScriptTarget.ES5 },
        );
        const [Derived, thisInBase] = result.main();
        assert.strictEqual(Derived.y, 1);
        assert.strictEqual(thisInBase, Derived);
    });
    it("super- and this-call in es2015", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                class Base {
                    static x() {
                        return 1;
                    }
                }
                class Derived extends Base {
                    static x() {
                        return super.x() + 1;
                    }
                    static y = this.x();
                }
                return [
                    Derived,
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Derived] = result.main();
        assert.strictEqual(Derived.y, 2);
    });
    it("super- and this-call in es5", () => {
        const result = evaluator.evaluateTypeScript(
            `
            export function main() {
                class Base {
                    static x() {
                        return 1;
                    }
                }
                class Derived extends Base {
                    static x() {
                        return super.x() + 1;
                    }
                    static y = this.x();
                }
                return [
                    Derived,
                ];
            }
        `,
            { target: ts.ScriptTarget.ES2015 },
        );
        const [Derived] = result.main();
        assert.strictEqual(Derived.y, 2);
    });
});
