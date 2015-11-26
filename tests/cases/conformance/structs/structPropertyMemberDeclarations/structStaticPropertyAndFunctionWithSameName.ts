// doc 4
// Static property member declarations declare properties in the constructor function type,
// and must specify names that are unique among all static property member declarations
// in the containing struct

struct C {
    static f: number;
    static f() {} // error
}

struct D {
	f: number;
    static f: number;
}