// doc 2.3

struct Base {
    public static x: string;
    public static fn(): string {
        return '';
    }
}

struct Derived extends Base {
    private static x: string; 
    private static fn(): string {
        return '';
    }
}

var b: typeof Base;
var d: typeof Derived;
var r = b.x; // ok
var r2 = d.x; // error

var r3 = b.fn(); // ok
var r4 = d.fn(); // error