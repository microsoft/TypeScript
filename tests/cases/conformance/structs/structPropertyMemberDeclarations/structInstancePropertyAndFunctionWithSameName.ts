// doc 4
// Instance property member declarations declare properties in the struct instance type,
// and must specify names that are unique among all instance property member
// and parameter property declarations in the containing struct.

struct C {
    x: number;
    x() { // error
        return 1;
    }
}

struct D {
    x: number;
    x(v) { } // error
}

struct E {
    x: number;
    constructor(private x: string) {}
}