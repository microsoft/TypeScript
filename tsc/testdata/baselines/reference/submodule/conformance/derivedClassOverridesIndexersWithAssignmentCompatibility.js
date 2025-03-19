//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassOverridesIndexersWithAssignmentCompatibility.ts] ////

//// [derivedClassOverridesIndexersWithAssignmentCompatibility.ts]
class Base {
    [x: string]: Object;
}

// ok, use assignment compatibility
class Derived extends Base {
    [x: string]: any;
}

class Base2 {
    [x: number]: Object;
}

// ok, use assignment compatibility
class Derived2 extends Base2 {
    [x: number]: any;
}

//// [derivedClassOverridesIndexersWithAssignmentCompatibility.js]
class Base {
}
// ok, use assignment compatibility
class Derived extends Base {
}
class Base2 {
}
// ok, use assignment compatibility
class Derived2 extends Base2 {
}
