//// [tests/cases/compiler/emitClassExpressionInDeclarationFile.ts] ////

//// [emitClassExpressionInDeclarationFile.ts]
export var simpleExample = class {
    static getTags() { }
    tags() { }
}
export var circularReference = class C {
    static getTags(c: C): C { return c }
    tags(c: C): C { return c }
}

// repro from #15066
export class FooItem {
    foo(): void { }
    name?: string;
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


//// [emitClassExpressionInDeclarationFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.FooItem = exports.circularReference = exports.simpleExample = void 0;
exports.WithTags = WithTags;
var simpleExample = class {
    static getTags() { }
    tags() { }
};
exports.simpleExample = simpleExample;
exports.circularReference = class C {
    static getTags(c) { return c; }
    tags(c) { return c; }
};
// repro from #15066
class FooItem {
    foo() { }
    name;
}
exports.FooItem = FooItem;
function WithTags(Base) {
    return class extends Base {
        static getTags() { }
        tags() { }
    };
}
class Test extends WithTags(FooItem) {
}
exports.Test = Test;
const test = new Test();
Test.getTags();
test.tags();
