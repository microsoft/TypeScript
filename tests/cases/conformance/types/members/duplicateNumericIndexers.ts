// @skipDefaultLibCheck: false
// it is an error to have duplicate index signatures of the same kind in a type

interface Number {
    [x: number]: string;
    [x: number]: string;
}

interface String {
    [x: number]: string;
    [x: number]: string;
}

interface Array<T> {
    [x: number]: T;
    [x: number]: T;
}

class C {
    [x: number]: string;
    [x: number]: string;
}

interface I {
    [x: number]: string;
    [x: number]: string;
}

var a: {
    [x: number]: string;
    [x: number]: string;
}

