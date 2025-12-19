// @target: esnext
// @declaration: true

export var noPrivates = class {
    static getTags() { }
    tags() { }
    static #ps = -1
    #p = 12
}

export class FooItem {
    foo(): void { }
    name?: string;
    #property = "capitalism"
}

export type Constructor<T> = new(...args: any[]) => T;
export function WithTags<T extends Constructor<FooItem>>(Base: T) {
    return class extends Base {
        static getTags(): void { }
        tags(): void { }
    }
}

export class Test extends WithTags(FooItem) {}

export class Test2 {
  nested = class {
    #prop = 42;
  }
}
