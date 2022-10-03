// @declaration: true
class B<T> {
    a: T;
    b: T;
}

class C<T> extends B<T> {
    public x: T;
}

var v2: C <string>;

var y = v2.x; // should be 'string'
var u = v2.a; // should be 'string'

var z = v2.b;

