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
////
////    static test() {
////        Base./*1*/;
////        this./*2*/;
////        C1./*3*/;
////    }
////}
////
////class C1 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}

verify.completions(
    {
        marker: ["1", "2"],
        // Same class, everything is visible
        includes: [
            { name: "privateMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "privateProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedOverriddenMethod", sortText: completion.SortText.LocalDeclarationPriority},
            { name: "protectedOverriddenProperty", sortText: completion.SortText.LocalDeclarationPriority }
        ],
    },
    {
        marker: "3",
        includes: [
            { name: "privateMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "privateProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "protectedProperty", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicMethod", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "publicProperty", sortText: completion.SortText.LocalDeclarationPriority }
        ],
        // Can not access protected properties overridden in subclass
        excludes: ["protectedOverriddenMethod", "protectedOverriddenProperty"],
    },
);
