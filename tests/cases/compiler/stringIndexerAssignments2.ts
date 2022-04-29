class C1 {
    [index: string]: string
    one: string;
}

class C2 {
    one: string;
}

class C3 {
    one: number;
    two: string;
}

var x: C1;
var a: C2;
var b: C3;

x = a;
x = b;