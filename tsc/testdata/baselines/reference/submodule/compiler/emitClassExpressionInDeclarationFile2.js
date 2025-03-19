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


//// [emitClassExpressionInDeclarationFile2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.FooItem = exports.noPrivates = void 0;
exports.WithTags = WithTags;
var noPrivates = class {
    static getTags() { }
    tags() { }
    static ps = -1;
    p = 12;
}
// altered repro from #15066 to add private property
;
exports.noPrivates = noPrivates;
// altered repro from #15066 to add private property
class FooItem {
    foo() { }
    name;
    property = "capitalism";
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
