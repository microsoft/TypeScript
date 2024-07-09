// In this file:
//  Assign to a module
//  Assign to a class
//  Assign to an enum
//  Assign to a function
//  Assign to a variable
//  Assign to a parameter
//  Assign to an interface

module M { }
M = null; // Error

class C { }
C = null; // Error

enum E { A }
E = null; // Error
E.A = null; // OK per spec, Error per implementation (509581)

function fn() { }
fn = null; // Should be error

var v;
v = null; // OK

function fn2(p) {
    p = null; // OK
}

interface I { }
I = null; // Error