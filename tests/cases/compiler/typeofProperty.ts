
interface I1 {
    a: number;
    b: typeof a; // Should yield error (a is not a value)
}

interface I2 {
    c: typeof d; // Should yield error (d is not a value)
    d: string;
}

interface I3 {
    e: typeof e; // Should yield error (e is not a value)
}

class C1 {
    a: number;
    b: typeof a; // Should yield error (a is not a value)
}


class C2 {
    c: typeof d; // Should yield error (d is not a value)
    d: string;
}

class C3 {
    e: typeof e; // Should yield error (e is not a value)
}



interface ValidInterface {
    x: string;
}

class ValidClass implements ValidInterface {
    x: string;
}

var vcInstance = new ValidClass();
var viInstance = vcInstance;

var x1: typeof vcInstance.x; // x1: string
var x2: typeof viInstance.x; // x2: string


