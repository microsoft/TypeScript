// Illegal attempts to define optional methods

var a: {
    x()?: number; // error
}

interface I {
    x()?: number; // error
}

class C {
    x()?: number; // error
}

interface I2<T> {
    x()?: T; // error
}

class C2<T> {
    x()?: T; // error
}


var b = {
    x()?: 1 // error
}