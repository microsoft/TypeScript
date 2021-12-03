/// <reference path="fourslash.ts" />


////class Class {
////    private privateInstanceMethod() { }
////    public publicInstanceMethod() { }
////
////    private privateProperty = 1;
////    public publicProperty = 1;
////
////    private static privateStaticProperty = 1;
////    public static publicStaticProperty = 1;
////
////    private static privateStaticMethod() { }
////    public static publicStaticMethod() {
////        Class./*staticsInsideClassScope*/publicStaticMethod();
////        var c = new Class();
////        c./*instanceMembersInsideClassScope*/privateProperty;
////    }
////}
////
////Class./*staticsOutsideClassScope*/publicStaticMethod();
////var c = new Class();
////c./*instanceMembersOutsideClassScope*/privateProperty;

verify.completions(
    {
        marker: "staticsInsideClassScope",
        exact: completion.functionMembersPlus([
            { name: "privateStaticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "privateStaticProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicStaticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicStaticProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "prototype", sortText: completion.SortText.LocationPriority },
        ]),
    },
    {
        marker: "instanceMembersInsideClassScope",
        unsorted: ["privateInstanceMethod", "publicInstanceMethod", "privateProperty", "publicProperty"],
    },
    {
        marker: "staticsOutsideClassScope",
        exact: completion.functionMembersPlus([
            { name: "publicStaticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicStaticProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "prototype", sortText: completion.SortText.LocationPriority },
        ]),
    },
    {
        marker: "instanceMembersOutsideClassScope",
        exact: ["publicInstanceMethod", "publicProperty"],
    },
);
