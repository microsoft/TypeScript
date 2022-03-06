/// <reference path='fourslash.ts'/>

////class Base {
////    private static privateMethod() { }
////    private static privateProperty;
////
////    protected static protectedMethod() { }
////    protected static protectedProperty;
////
////    public static publicMethod() { }
////    public static publicProperty;
////
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}
////
////class C3 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}
////
////Base./*1*/;
////C3./*2*/;

// Only public properties are visible outside the class
verify.completions({
    marker: ["1", "2"],
    exact: completion.functionMembersPlus([
        { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "publicProperty", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "prototype", sortText: completion.SortText.LocationPriority },
    ]),
});
