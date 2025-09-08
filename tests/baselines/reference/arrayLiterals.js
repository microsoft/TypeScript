//// [tests/cases/conformance/expressions/arrayLiterals/arrayLiterals.ts] ////

//// [arrayLiterals.ts]
// Empty array literal with no contextual type has type Undefined[]

var arr1= [[], [1], ['']];

var arr2 = [[null], [1], ['']];


// Array literal with elements of only EveryType E has type E[]
var stringArrArr = [[''], [""]];

var stringArr = ['', ""];

var numberArr = [0, 0.0, 0x00, 1e1];

var boolArr = [false, true, false, true];

class C { private p; }
var classArr = [new C(), new C()];

var classTypeArray = [C, C, C];
var classTypeArray: Array<typeof C>; // Should OK, not be a parse error

// Contextual type C with numeric index signature makes array literal of EveryType E of type BCT(E,C)[]
var context1: { [n: number]: { a: string; b: number; }; } = [{ a: '', b: 0, c: '' }, { a: "", b: 3, c: 0 }];
var context2 = [{ a: '', b: 0, c: '' }, { a: "", b: 3, c: 0 }];

// Contextual type C with numeric index signature of type Base makes array literal of Derived have type Base[]
class Base { private p; }
class Derived1 extends Base { private m };
class Derived2 extends Base { private n };
var context3: Base[] = [new Derived1(), new Derived2()];

// Contextual type C with numeric index signature of type Base makes array literal of Derived1 and Derived2 have type Base[]
var context4: Base[] = [new Derived1(), new Derived1()];



//// [arrayLiterals.js]
// Empty array literal with no contextual type has type Undefined[]
var arr1 = [[], [1], ['']];
var arr2 = [[null], [1], ['']];
// Array literal with elements of only EveryType E has type E[]
var stringArrArr = [[''], [""]];
var stringArr = ['', ""];
var numberArr = [0, 0.0, 0x00, 1e1];
var boolArr = [false, true, false, true];
class C {
    p;
}
var classArr = [new C(), new C()];
var classTypeArray = [C, C, C];
var classTypeArray; // Should OK, not be a parse error
// Contextual type C with numeric index signature makes array literal of EveryType E of type BCT(E,C)[]
var context1 = [{ a: '', b: 0, c: '' }, { a: "", b: 3, c: 0 }];
var context2 = [{ a: '', b: 0, c: '' }, { a: "", b: 3, c: 0 }];
// Contextual type C with numeric index signature of type Base makes array literal of Derived have type Base[]
class Base {
    p;
}
class Derived1 extends Base {
    m;
}
;
class Derived2 extends Base {
    n;
}
;
var context3 = [new Derived1(), new Derived2()];
// Contextual type C with numeric index signature of type Base makes array literal of Derived1 and Derived2 have type Base[]
var context4 = [new Derived1(), new Derived1()];
