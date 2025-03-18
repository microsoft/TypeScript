//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/objectTypesIdentityWithPrivates3.ts] ////

//// [objectTypesIdentityWithPrivates3.ts]
interface T1 { }
interface T2 { z }

class C1<T> {
    private x;
}

class C2 extends C1<T1> {
    y;
}

var c1: C1<T2>;
<C2>c1; // Should succeed (private x originates in the same declaration)


class C3<T> {
    private x: T; // This T is the difference between C3 and C1
}

class C4 extends C3<T1> {
    y;
}

var c3: C3<T2>;
<C4>c3; // Should fail (private x originates in the same declaration, but different types)

//// [objectTypesIdentityWithPrivates3.js]
class C1 {
    x;
}
class C2 extends C1 {
    y;
}
var c1;
c1;
class C3 {
    x;
}
class C4 extends C3 {
    y;
}
var c3;
c3;
