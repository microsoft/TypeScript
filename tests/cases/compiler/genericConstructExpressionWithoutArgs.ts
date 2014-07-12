class B { }
var b = new B; // no error
 
class C<T> {
   x: T;
}

var c = new C // C<any>
var c2 = new C<number> // error, type params are actually part of the arg list so you need both
