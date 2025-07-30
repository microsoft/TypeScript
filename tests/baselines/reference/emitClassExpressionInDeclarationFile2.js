//// [tests/cases/compiler/emitClassExpressionInDeclarationFile2.ts] ////

//// [emitClassExpressionInDeclarationFile2.ts]
export var noPrivates = class {
    static getTags() { }
    tags() { }
    private static ps = -1
    private p = 12
}

// altered repro from #15066 to add private property
export class FooItem {
    foo(): void { }
    name?: string;
    private property = "capitalism"
}

export type Constructor<T> = new(...args: any[]) => T;
export function WithTags<T extends Constructor<FooItem>>(Base: T) {
    return class extends Base {
        static getTags(): void { }
        tags(): void { }
    }
}

export class Test extends WithTags(FooItem) {}

const test = new Test();

Test.getTags()
test.tags();

export var noPrivates2 = class {
    static getTags() { }
    tags() { }
    #p = -1
}


//// [emitClassExpressionInDeclarationFile2.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _noPrivates2_p, _b;
export var noPrivates = (_a = class {
        constructor() {
            this.p = 12;
        }
        static getTags() { }
        tags() { }
    },
    __setFunctionName(_a, "noPrivates"),
    _a.ps = -1,
    _a);
// altered repro from #15066 to add private property
export class FooItem {
    constructor() {
        this.property = "capitalism";
    }
    foo() { }
}
export function WithTags(Base) {
    return class extends Base {
        static getTags() { }
        tags() { }
    };
}
export class Test extends WithTags(FooItem) {
}
const test = new Test();
Test.getTags();
test.tags();
export var noPrivates2 = (_b = class {
        constructor() {
            _noPrivates2_p.set(this, -1);
        }
        static getTags() { }
        tags() { }
    },
    _noPrivates2_p = new WeakMap(),
    _b);
