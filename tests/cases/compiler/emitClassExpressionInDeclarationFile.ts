// @declaration: true
export var simpleExample = class {
    static getTags() { }
    tags() { }
    private static ps = -1
    private p = 12
}
export var circularReference = class C {
    static getTags(c: C): C { return c }
    tags(c: C): C { return c }
}

class Base { }
export function foo() {
    return class extends Base { }
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
