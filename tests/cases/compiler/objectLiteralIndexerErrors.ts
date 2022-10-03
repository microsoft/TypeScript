interface A {
    x: number;
}

interface B extends A {
    y: string;
}

var a: A;
var b: B;
var c: any;

var o1: { [s: string]: A;[n: number]: B; } = { x: b, 0: a }; // both indexers are A
o1 = { x: c, 0: a }; // string indexer is any, number indexer is A