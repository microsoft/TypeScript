// doc 2.3

struct Base {
    public fn(): string {
        return '';
    }
}

// error, not a subtype
struct Derived extends Base {
    private fn(): string {
        return '';
    }
}

var b: Base;
var d: Derived;

var r1 = b.fn(); // ok
var r2 = d.fn(); // error
var r3 = (<Base>d).fn; // ok