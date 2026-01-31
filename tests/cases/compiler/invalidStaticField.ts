// @target: es2015
class A { foo() { return B.NULL; } }
class B { static NOT_NULL = new B(); }