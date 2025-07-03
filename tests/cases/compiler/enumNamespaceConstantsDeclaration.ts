// @declaration: true

// Test for constant declarations inside namespace merged with enum
enum Foo {
    bar
}
namespace Foo {
    export const baz = Foo.bar;
}

// Multiple enum members
enum MyEnum {
    First = 1,
    Second = 2
}
namespace MyEnum {
    export const value1 = MyEnum.First;
    export const value2 = MyEnum.Second;
}

