// doc 4.2
// In a static member function, this represents the constructor function object on which
// the static member function was invoked. Thus, a call to ‘new this()’ may actually invoke
// a derived struct constructor.
// ok
struct Base {
    foo() { return 1; }
    static create() {
        return new this();
    }
}

struct Derived extends Base {
    foo() { return 2; }
}
var d = Derived.create(); // new B()
d.foo(); // 2