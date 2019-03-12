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
/////// Make the protected members public
////class C4 extends Base {
////    public static protectedOverriddenMethod() { }
////    public static protectedOverriddenProperty;
////}
////class Derived extends C4 {
////   test() {
////        Derived./*1*/
////   }
////}
//// Derived./*2*/

const publicCompletions: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = ["publicMethod", "publicProperty", ...completion.functionMembers];

verify.completions(
    {
        // Sub class, everything but private is visible
        marker: "1",
        exact: [
            "prototype",
            "protectedOverriddenMethod",
            "protectedOverriddenProperty",
            "protectedMethod",
            "protectedProperty",
            ...publicCompletions
        ],
    },
    {
        // Can see protected methods elevated to public
        marker: "2",
        exact: [
            "prototype",
            "protectedOverriddenMethod",
            "protectedOverriddenProperty",
            ...publicCompletions,
        ],
    },
);
