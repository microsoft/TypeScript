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

// String enum
enum StringEnum {
    Option1 = "option1",
    Option2 = "option2"
}
namespace StringEnum {
    export const selected = StringEnum.Option1;
}