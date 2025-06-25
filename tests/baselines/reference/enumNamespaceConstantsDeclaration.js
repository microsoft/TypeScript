//// [tests/cases/compiler/enumNamespaceConstantsDeclaration.ts] ////

//// [enumNamespaceConstantsDeclaration.ts]
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

//// [enumNamespaceConstantsDeclaration.js]
// Test for constant declarations inside namespace merged with enum
var Foo;
(function (Foo) {
    Foo[Foo["bar"] = 0] = "bar";
})(Foo || (Foo = {}));
(function (Foo) {
    Foo.baz = Foo.bar;
})(Foo || (Foo = {}));
// Multiple enum members
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["First"] = 1] = "First";
    MyEnum[MyEnum["Second"] = 2] = "Second";
})(MyEnum || (MyEnum = {}));
(function (MyEnum) {
    MyEnum.value1 = MyEnum.First;
    MyEnum.value2 = MyEnum.Second;
})(MyEnum || (MyEnum = {}));
// String enum
var StringEnum;
(function (StringEnum) {
    StringEnum["Option1"] = "option1";
    StringEnum["Option2"] = "option2";
})(StringEnum || (StringEnum = {}));
(function (StringEnum) {
    StringEnum.selected = StringEnum.Option1;
})(StringEnum || (StringEnum = {}));
