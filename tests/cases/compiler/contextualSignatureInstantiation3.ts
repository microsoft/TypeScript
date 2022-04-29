function map<T, U>(items: T[], f: (x: T) => U): U[]{
    return items.map(f);
}

function identity<T>(x: T) {
    return x;
}

function singleton<T>(x: T) {
    return [x];
}

var xs = [1, 2, 3];

// Have compiler check that we get the correct types
var v1: number[];
var v1 = xs.map(identity);      // Error if not number[]
var v1 = map(xs, identity);     // Error if not number[]

var v2: number[][];         
var v2 = xs.map(singleton);     // Error if not number[][]
var v2 = map(xs, singleton);    // Error if not number[][]
