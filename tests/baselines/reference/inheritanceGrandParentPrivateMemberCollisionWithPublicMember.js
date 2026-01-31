//// [tests/cases/compiler/inheritanceGrandParentPrivateMemberCollisionWithPublicMember.ts] ////

//// [inheritanceGrandParentPrivateMemberCollisionWithPublicMember.ts]
class A {
    private myMethod() { }
}

class B extends A { }

class C extends B {
    public myMethod() { }
}


//// [inheritanceGrandParentPrivateMemberCollisionWithPublicMember.js]
class A {
    myMethod() { }
}
class B extends A {
}
class C extends B {
    myMethod() { }
}
