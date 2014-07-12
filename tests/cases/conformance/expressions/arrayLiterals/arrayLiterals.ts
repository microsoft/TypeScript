// Empty array literal with no contextual type has type Undefined[]

var arr1= [[], [1], ['']];
var arr1: {}[]; // Bug 825172: Error ({}[] does not match {}[]), but should be OK

var arr2 = [[null], [1], ['']];
var arr2: {}[]; // Bug 825172: Error ({}[] does not match {}[]), but should be OK


// Array literal with elements of only EveryType E has type E[]
var stringArrArr = [[''], [""]];
var stringArrArr: string[][];

var stringArr = ['', ""];
var stringArr: string[];

var numberArr = [0, 0.0, 0x00, 1e1];
var numberArr: number[];

var boolArr = [false, true, false, true];
var boolArr: boolean[];

class C { private p; }
var classArr = [new C(), new C()];
var classArr: C[]; // Should be OK

var classTypeArray = [C, C, C];
var classTypeArray: Array<typeof C>; // Should OK, not be a parse error

// Contextual type C with numeric index signature makes array literal of EveryType E of type BCT(E,C)[]
var context1: { [n: number]: { a: string; b: number; }; } = [{ a: '', b: 0, c: '' }, { a: "", b: 3, c: 0 }];
var context2 = [{ a: '', b: 0, c: '' }, { a: "", b: 3, c: 0 }];
var context2: Array<{}>; // Should be OK

// Contextual type C with numeric index signature of type Base makes array literal of Derived have type Base[]
class Base { private p; }
class Derived1 extends Base { private m };
class Derived2 extends Base { private n };
var context3: Base[] = [new Derived1(), new Derived2()];

// Contextual type C with numeric index signature of type Base makes array literal of Derived1 and Derived2 have type Base[]
var context4: Base[] = [new Derived1(), new Derived1()];

