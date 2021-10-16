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
        exact: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "privateStaticProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicStaticProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "privateStaticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicStaticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            ...completion.functionMembers
        ],
    },
    {
        marker: "instanceMembersInsideClassScope",
        exact: ["privateInstanceMethod", "publicInstanceMethod", "privateProperty", "publicProperty"],
    },
    {
        marker: "staticsOutsideClassScope",
        exact: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "publicStaticProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicStaticMethod", sortText: completion.SortText.LocalDeclarationPriority },
            ...completion.functionMembers
        ],
    },
    {
        marker: "instanceMembersOutsideClassScope",
        exact: ["publicInstanceMethod", "publicProperty"],
    },
);
