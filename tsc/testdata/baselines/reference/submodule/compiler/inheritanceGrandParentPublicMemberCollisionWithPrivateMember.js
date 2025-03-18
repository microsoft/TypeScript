//// [tests/cases/compiler/inheritanceGrandParentPublicMemberCollisionWithPrivateMember.ts] ////

//// [inheritanceGrandParentPublicMemberCollisionWithPrivateMember.ts]
class A {
    public myMethod() { }
}

class B extends A { }

class C extends B {
    private myMethod() { }
}


//// [inheritanceGrandParentPublicMemberCollisionWithPrivateMember.js]
class A {
    myMethod() { }
}
class B extends A {
}
class C extends B {
    myMethod() { }
}
