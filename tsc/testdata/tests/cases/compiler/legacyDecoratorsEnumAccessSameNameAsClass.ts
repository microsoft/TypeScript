// @target: esnext
// @experimentalDecorators: true
// @strict: true

export enum MyEnum {
    Foo = "FooValue",
    Bar = "BarValue",
}

function myDecorator(target: any) {
    return target;
}

// Enum member access should not be renamed
@myDecorator
export class Foo {
    type: MyEnum = MyEnum.Foo;

    getType(): MyEnum {
        return this.type || MyEnum.Foo;
    }
}

// Property access on object should not rename the property name
declare const obj: { Bar: string };

@myDecorator
export class Bar {
    prop = obj.Bar;

    method() {
        return obj.Bar;
    }
}

// Nested property access should not rename the innermost name
declare const nested: { a: { Baz: number } };

@myDecorator
export class Baz {
    prop = nested.a.Baz;
}

// Static member of another class should not rename the property name
class Other {
    static Qux = 42;
}

@myDecorator
export class Qux {
    prop = Other.Qux;
}

// Standalone reference to the class SHOULD still be renamed (self-reference)
@myDecorator
export class SelfRef {
    static instance = new SelfRef();
    method() {
        return SelfRef;
    }
}
