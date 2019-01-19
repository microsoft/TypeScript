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
        exact: ["prototype", "privateStaticProperty", "publicStaticProperty", "privateStaticMethod", "publicStaticMethod", ...completion.functionMembers],
    },
    {
        marker: "instanceMembersInsideClassScope",
        exact: ["privateInstanceMethod", "publicInstanceMethod", "privateProperty", "publicProperty"],
    },
    {
        marker: "staticsOutsideClassScope",
        exact: ["prototype", "publicStaticProperty", "publicStaticMethod", ...completion.functionMembers],
    },
    {
        marker: "instanceMembersOutsideClassScope",
        exact: ["publicInstanceMethod", "publicProperty"],
    },
);
