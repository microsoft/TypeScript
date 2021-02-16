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
////class C2 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////
////    static test() {
////        Base./*1*/;
////        C2./*2*/;
////        this./*3*/;
////        super./*4*/;
////    }
////}

verify.completions(
    {
        // Same class, everything is visible
        marker: ["1"],
        exact: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "protectedMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenProperty", sortText: completion.SortText.LocalDeclarationPriority},
            ...completion.functionMembers,
        ],
    },
    {
        marker: ["2", "3"],
        exact: [
            { name: "prototype", sortText: completion.SortText.LocationPriority },
            { name: "protectedOverriddenMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "test", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicProperty", sortText: completion.SortText.LocalDeclarationPriority },
            ...completion.functionMembers,
        ],
    },
    {
        // only public and protected methods of the base class are accessible through super
        marker: "4",
        exact: [
            { name: "protectedMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "apply", sortText: completion.SortText.LocationPriority },
            { name: "call", sortText: completion.SortText.LocationPriority },
            { name: "bind", sortText: completion.SortText.LocationPriority },
            { name: "toString", sortText: completion.SortText.LocationPriority },
        ],
    },
);
