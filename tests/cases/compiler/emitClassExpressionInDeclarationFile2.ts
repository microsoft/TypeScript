// @declaration: true
// @target: ES6
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
