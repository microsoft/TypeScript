/// <reference path="fourslash.ts"/>

////interface I {
////    age: number;
////}
//// class Foo {
////     property1: string;
////     constructor(value: number) { this.property1 = "hello"; }
////     static method1() {}
////     method3(): number { return 3; }
////     /**
////      * @param {string} foo A value.
////      * @returns {number} Another value
////      * @mytag
////      */
////     method4(foo: string) { return 3; }
//// }
//// namespace Foo.Namespace { export interface SomeType { age2: number } }
//// /**
////  * @type { /*type1*/Foo./*typeFooMember*/Namespace./*NamespaceMember*/SomeType }
////  */
////var x;
/////*globalValue*/
////x./*valueMemberOfSomeType*/
////var x1: Foo;
////x1./*valueMemberOfFooInstance*/;
////Foo./*valueMemberOfFoo*/;
//// /**
////  * @type { {/*propertyName*/ageX: number} }
////  */
////var y;

verify.completions(
    {
        marker: "type1",
        includes: [
            { name: "Foo", kind: "class" },
            { name: "I", kind: "interface" },
        ],
        excludes: ["Namespace", "SomeType", "x", "x1", "y", "method1", "property1", "method3", "method4", "foo"],
    },
    {
        marker: "typeFooMember",
        exact: { name: "Namespace", kind: "module", kindModifiers: "export" },
    },
    {
        marker: "NamespaceMember",
        exact: { name: "SomeType", kind: "interface", kindModifiers: "export" },
    },
    {
        marker: "globalValue",
        includes: [
            { name: "Foo", kind: "class" },
            { name: "x", kind: "var" },
            { name: "x1", kind: "var" },
            { name: "y", kind: "var" },
        ],
        excludes: ["I", "Namespace", "SomeType", "method1", "property1", "method3", "method4", "foo"],
    },
    // This is TypeScript code, so the @type tag doesn't change the type of `x`.
    { marker: "valueMemberOfSomeType", exact: undefined },
    {
        marker: "valueMemberOfFooInstance",
        exact: [
            { name: "property1", kind: "property" },
            { name: "method3", kind: "method" },
            { name: "method4", kind: "method" },
        ],
    },
    {
        marker: "valueMemberOfFoo",
        exact: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "method1", kind: "method", kindModifiers: "static", sortText: completion.SortText.LocalDeclarationPriority },
            ...completion.functionMembers,
        ],
    },
    {
        marker: "propertyName",
        exact: undefined,
    },
);
