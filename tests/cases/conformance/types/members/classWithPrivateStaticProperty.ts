class GrandParent {
    private static privateStaticGrandParent = "unset";
    protected static protectedStaticGrandParent = "unset";
    public static publicStaticGrandParent = "unset";

    testGrandparent() {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";

        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";

        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    }
}

class Parent extends GrandParent {
    private static privateStaticParent = "unset";
    protected static protectedStaticParent = "unset";
    public static publicStaticParent = "unset";

    testParent() {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";

        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";

        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    }
}

class Child extends Parent {
    private static privateStaticChild = "unset";
    protected static protectedStaticChild = "unset";
    protected static publicStaticChild = "unset";

    testChild() {
        GrandParent.privateStaticGrandParent = "set";
        GrandParent.protectedStaticGrandParent = "set";
        GrandParent.publicStaticGrandParent = "set";

        Parent.privateStaticGrandParent = "set";
        Parent.protectedStaticGrandParent = "set";
        Parent.publicStaticGrandParent = "set";
        Parent.privateStaticParent = "set";
        Parent.protectedStaticParent = "set";
        Parent.publicStaticParent = "set";

        Child.privateStaticGrandParent = "set";
        Child.protectedStaticGrandParent = "set";
        Child.publicStaticGrandParent = "set";
        Child.privateStaticParent = "set";
        Child.protectedStaticParent = "set";
        Child.publicStaticParent = "set";
        Child.privateStaticChild = "set";
        Child.protectedStaticChild = "set";
        Child.publicStaticChild = "set";
    }
}
