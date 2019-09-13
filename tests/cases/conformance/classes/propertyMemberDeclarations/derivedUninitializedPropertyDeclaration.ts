class A {
    property = 'x';
}
class B extends A {
    property; // should be an error
}
class C {
    p: string;
}
class D extends C {
    p: 'hi'; // should also be an error?
}
