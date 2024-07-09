
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

// Construct expression with no parentheses for construct signature with 0 parameters
var a = new C0;
var a: C0;


// Generic construct expression with no parentheses
var c1 = new T;
var c1: T<{}>;

// Construct expression where constructor is of type 'any' with no parentheses
var d = new anyCtor;
var d: any;

// Construct expression where constructor is of type 'any' with > 1 arg
var d = new anyCtor1(undefined);

// Construct expression of type where apparent type has a construct signature with 0 arguments
function newFn1<T extends { new (): number }>(s: T) {
    var p = new s;
    var p: number;
}

// Construct expression of type where apparent type has a construct signature with 1 arguments
function newFn2<T extends { new (s: number): string}>(s: T) {
    var p = new s(32);
    var p: string;
}

// Construct expression of void returning function
function fnVoid(): void { }
var t = new fnVoid();
var t: any;

// Chained new expressions
var nested = new (new (new nestedCtor())())();
var n = new nested();
var n = new nested();
