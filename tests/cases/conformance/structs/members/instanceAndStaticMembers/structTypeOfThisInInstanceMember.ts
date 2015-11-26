// doc 2.1
// Within constructors and instance member functions, the type of this is the instance type of the sturct.

struct C {
    x = this;
    foo() {
        return this;
    }
    constructor(x: number) {
        var t = this;
        t.x;
        t.z; // error, z doesn't exist.
        var r = t.foo();
    }
}

var c: C;
// all ok
var r = c.x;
var ra = c.x.x.x;
var r3 = c.foo();
var rs = [r, r3];

rs.forEach(x => {
    x.foo;
    x.x;
});