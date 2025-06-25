declare enum Foo {
    bar = 0
}
declare namespace Foo {
    const baz = bar;
}
declare enum MyEnum {
    First = 1,
    Second = 2
}
declare namespace MyEnum {
    const value1 = First;
    const value2 = Second;
}
declare enum StringEnum {
    Option1 = "option1",
    Option2 = "option2"
}
declare namespace StringEnum {
    const selected: any;
}
