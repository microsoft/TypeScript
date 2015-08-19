import a = M.B; // error
import b = M.I; // no error
import d = c.B; // error
import e = c.I; // no error
import f = c; // error
import c = M; // error
import g = c.B; // no error
import h = c.I; // no error
import i = c; // no error
class C extends a { // no error 
}
class D extends M.B { // error
}
module M {
    export class B {
    }
    export interface I {
    }
}
import a1 = M.B; // no error
import b1 = M.I; // no error
import d1 = c1.B; // error
import e1 = c1.I; // no error
import f1 = c1; // error
import c1 = M; // no error
import g1 = c1.B; // no error
import h1 = c1.I; // no error
import i1 = c1; // no error