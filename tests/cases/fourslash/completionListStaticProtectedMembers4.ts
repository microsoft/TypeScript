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

const publicCompletions: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = completion.functionMembersPlus([
    { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
    { name: "publicProperty", sortText: completion.SortText.LocalDeclarationPriority },
]);

verify.completions(
    {
        // Sub class, everything but private is visible
        marker: "1",
        unsorted: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "protectedOverriddenMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedProperty", sortText: completion.SortText.LocalDeclarationPriority },
            ...publicCompletions
        ],
    },
    {
        // Can see protected methods elevated to public
        marker: "2",
        unsorted: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "protectedOverriddenMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenProperty", sortText: completion.SortText.LocalDeclarationPriority },
            ...publicCompletions,
        ],
    },
);
