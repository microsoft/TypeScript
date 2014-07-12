
class C0 {

}
class C1 {
    constructor(n: number, s: string) { }
}

class T<T> {
    constructor(n?: T) { }
}

var anyCtor: {
    new (): any;
};

var anyCtor1: {
    new (n): any;
};

interface nestedCtor {
    new (): nestedCtor;
}
var nestedCtor: nestedCtor;

// Construct expression with no parentheses for construct signature with > 0 parameters
var b = new C0 32, ''; // Parse error

// Generic construct expression with no parentheses
var c1 = new T;
var c1: T<{}>;
var c2 = new T<string>; // Parse error


// Construct expression of non-void returning function
function fnNumber(): number { return 32; }
var s = new fnNumber(); // Error
