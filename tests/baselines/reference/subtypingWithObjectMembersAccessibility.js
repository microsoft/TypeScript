//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypingWithObjectMembersAccessibility.ts] ////

//// [subtypingWithObjectMembersAccessibility.ts]
// Derived member is private, base member is not causes errors

class Base {
    foo: string;
}

class Derived extends Base {
    bar: string;
}

class A {
    public foo: Base;
}

class B extends A {
    private foo: Derived; // error
}

class A2 {
    public 1: Base; 
}

class B2 extends A2 {
    private 1: Derived; // error
}

class A3 {
    public '1': Base;
}

class B3 extends A3 {
    private '1': Derived; // error
}

//// [subtypingWithObjectMembersAccessibility.js]
// Derived member is private, base member is not causes errors
class Base {
}
class Derived extends Base {
}
class A {
}
class B extends A {
}
class A2 {
}
class B2 extends A2 {
}
class A3 {
}
class B3 extends A3 {
}
