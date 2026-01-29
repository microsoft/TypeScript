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
export var simpleExample = class {
    static getTags() { }
    tags() { }
};
export var circularReference = class C {
    static getTags(c) { return c; }
    tags(c) { return c; }
};
// repro from #15066
export class FooItem {
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


//// [emitClassExpressionInDeclarationFile.d.ts]
export declare var simpleExample: {
    new (): {
        tags(): void;
    };
    getTags(): void;
};
export declare var circularReference: {
    new (): {
        tags(c: /*elided*/ any): /*elided*/ any;
    };
    getTags(c: {
        tags(c: /*elided*/ any): /*elided*/ any;
    }): {
        tags(c: /*elided*/ any): /*elided*/ any;
    };
};
export declare class FooItem {
    foo(): void;
    name?: string;
}
export type Constructor<T> = new (...args: any[]) => T;
export declare function WithTags<T extends Constructor<FooItem>>(Base: T): {
    new (...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & T;
declare const Test_base: {
    new (...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & typeof FooItem;
export declare class Test extends Test_base {
}
export {};
