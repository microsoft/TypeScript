//@noimplicitany: true
declare class A {
    private foo(a); // OK - ambient class and private method - no error
}

declare class B {
    public foo(a); // OK - ambient class and public method - error
}

class C {
    private foo(a) { } // OK - non-ambient class and private method - error
}
class D {
    public foo(a) { } // OK - non-ambient class and public method - error
}