// @target: es2015
class A { foo() { } }
var x = A;
class C extends x { } // error, could not find symbol xs