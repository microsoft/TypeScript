// @target: es2020
// @strict: true

export enum MyEnum {
    Foo = "FooValue",
    Bar = "BarValue",
}

// Private fields on a class trigger class alias creation at target < ES2022.
// Enum member access with same name as class should not be renamed.
export class Foo {
    #private = 1;
    static instance = new Foo();
    type: MyEnum = MyEnum.Foo;

    getType(): MyEnum {
        return this.type || MyEnum.Foo;
    }

    getPrivate() {
        return this.#private;
    }
}

// Property access with same name as class in static context
declare const obj: { Bar: number };

export class Bar {
    #data = 0;
    static ref = new Bar();
    static prop = obj.Bar;
}

// Class expression with private fields and self-reference
declare const obj2: { Baz: string };

const MyClass = class Baz {
    #field = 1;
    static instance = new Baz();
    prop = obj2.Baz;
}
