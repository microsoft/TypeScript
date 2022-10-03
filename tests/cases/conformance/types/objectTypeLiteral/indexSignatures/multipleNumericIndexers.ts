// Multiple indexers of the same type are an error

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

var b: {
    [x: number]: string;
    [x: number]: string
} = { 1: '', "2": '' }

class C2<T> {
    [x: number]: string;
    [x: number]: string;
}

interface I<T> {
    [x: number]: string;
    [x: number]: string;
}
