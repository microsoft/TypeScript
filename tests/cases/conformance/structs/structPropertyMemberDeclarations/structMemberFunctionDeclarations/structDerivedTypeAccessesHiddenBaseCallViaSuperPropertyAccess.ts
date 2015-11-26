// doc 4.2
// A member function can access overridden base struct members using a super property access.

struct Base {
    foo(x: { a: number }): { a: number } {
        return null;
    }
}

struct Derived extends Base {
    foo(x: { a: number; b: number }): { a: number; b: number } {
        return null;
    }

    bar() {
        var r = super.foo({ a: 1 }); // { a: number }
		var r2 = this.foo({a: 1}); // error, Argument of type '{ a: number; }' is not assignable to parameter of type '{ a: number; b: number; }'.
        var r3 = super.foo({ a: 1, b: 2 }); // { a: number }
        var r4 = this.foo({ a: 1, b: 2 }); // { a: number; b: number; }
    }
}