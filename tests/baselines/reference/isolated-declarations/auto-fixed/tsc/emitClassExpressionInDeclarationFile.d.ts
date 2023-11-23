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
export function WithTags<T extends Constructor<FooItem>>(Base: T): {
    new(...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & T {
    return class extends Base {
        static getTags(): void { }
        tags(): void { }
    }
}

const TestBase: {
    new(...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & typeof FooItem = WithTags(FooItem);
export class Test extends TestBase {}

const test = new Test();

Test.getTags()
test.tags();


/// [Declarations] ////



//// [emitClassExpressionInDeclarationFile.d.ts]
export declare var simpleExample: {
    new (): {
        tags(): void;
    };
    getTags(): void;
};
export declare var circularReference: {
    new (): {
        tags(c: any): any;
    };
    getTags(c: {
        tags(c: any): any;
    }): {
        tags(c: any): any;
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
declare const TestBase: {
    new (...args: any[]): {
        tags(): void;
        foo(): void;
        name?: string;
    };
    getTags(): void;
} & typeof FooItem;
export declare class Test extends TestBase {
}
export {};
//# sourceMappingURL=emitClassExpressionInDeclarationFile.d.ts.map