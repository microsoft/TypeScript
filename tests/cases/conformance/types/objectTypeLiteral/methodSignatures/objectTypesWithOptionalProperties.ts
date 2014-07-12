// Basic uses of optional properties

var a: {
    x?: number; // ok
}

interface I {
    x?: number; // ok
}

class C {
    x?: number; // error
}

interface I2<T> {
    x?: T; // ok
}

class C2<T> {
    x?: T; // error
}

var b = {
    x?: 1 // error
}