/// <reference path="fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsFileJsdocTypedefTagTypeExpressionCompletion3_typedef.js

//// /**
////  * @typedef {{ age: number }} Foo.Namespace.SomeType
////  */
//// class Foo {
////     constructor(value) { this.property1 = "hello"; }
////     static method1() {}
////     method3() { return 3; }
////     /**
////      * @param {string} foo A value.
////      * @returns {number} Another value
////      * @mytag
////      */
////     method4(foo) { return 3; }
//// }
//// /**
////  * @type { /*type1*/Foo./*typeFooMember*/Namespace./*NamespaceMember*/SomeType }
////  */
////var x;
/////*globalValue*/
////x./*valueMemberOfSomeType*/
//// /**
////  * @type { /*type2*/Foo }
////  */
////var x1;
////x1./*valueMemberOfFooInstance*/;
////Foo./*valueMemberOfFoo*/;

const warnings = (names: ReadonlyArray<string>): ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> =>
    names.map(name => ({ name, kind: "warning" }));

verify.completions(
    {
        marker: ["type1", "type2"],
        includes: [
            { name: "Foo", kind: "class" },
            ...warnings(["Namespace", "SomeType", "x", "x1", "method1", "property1", "method3", "method4", "foo"]),
        ],
    },
    {
        marker: "typeFooMember",
        exact: [
            { name: "Namespace", kind: "module", kindModifiers: "export" },
            ...warnings(["Foo", "value", "property1", "method1", "method3", "method4", "foo", "age", "SomeType", "x", "x1"]),
        ],
    },
    {
        marker: "NamespaceMember",
        exact: [
            { name: "SomeType", kind: "type" },
            ...warnings(["Foo", "value", "property1", "method1", "method3", "method4", "foo", "age", "Namespace", "x", "x1"]),
        ],
    },
    {
        marker: "globalValue",
        includes: [
            { name: "Foo", kind: "class" },
            { name: "x", kind: "var" },
            { name: "x1", kind: "var" },
            ...warnings(["Namespace", "SomeType", "method1", "property1", "method3", "method4", "foo"]),
        ],
    },
    {
        marker: "valueMemberOfSomeType",
        exact: [
            { name: "age", kind: "property" },
            ...warnings(["Foo", "value", "property1", "method1", "method3", "method4", "foo", "Namespace", "SomeType", "x", "x1"]),
        ],
    },
    {
        marker: "valueMemberOfFooInstance",
        exact: [
            { name: "property1", kind: "property" },
            { name: "method3", kind: "method" },
            { name: "method4", kind: "method" },
            ...warnings(["Foo", "value", "method1", "foo", "age", "Namespace", "SomeType", "x", "x1"]),
        ],
    },
    {
        marker: "valueMemberOfFoo",
        exact: [
            { name: "prototype", kind: "property" },
            { name: "method1", kind: "method", kindModifiers: "static" },
            ...completion.functionMembers,
            ...warnings(["Foo", "value", "property1", "method3", "method4", "foo", "age", "Namespace", "SomeType", "x", "x1"]),
        ],
    },
);
