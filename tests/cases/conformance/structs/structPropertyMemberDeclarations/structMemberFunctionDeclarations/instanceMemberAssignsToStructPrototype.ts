// doc 4.2
// An instance member function declaration declares a property in the struct instance type and
// assigns a function object to a property on the prototype object of the struct.

struct C {
    foo() {
        C.prototype.foo = () => { }
    }

    bar(x: number): number {
        C.prototype.bar = () => { } // error, Type '() => void' is not assignable to type '(x: number) => number'
        C.prototype.bar = (x) => x; // ok
        C.prototype.bar = (x: number) => 1; // ok
        return 1;
    }
}