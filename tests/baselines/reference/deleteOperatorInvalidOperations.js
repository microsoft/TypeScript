//// [tests/cases/conformance/expressions/unaryOperators/deleteOperator/deleteOperatorInvalidOperations.ts] ////

//// [deleteOperatorInvalidOperations.ts]
// Unary operator delete
var ANY;

// operand before delete operator
var BOOLEAN1 = ANY delete ;     //expect error

// miss an operand
var BOOLEAN2 = delete ;

// delete global variable s
class testADelx {
    constructor(public s: () => {}) {
        delete s;      //expect error
    }
}

//// [deleteOperatorInvalidOperations.js]
// Unary operator delete
var ANY;
// operand before delete operator
var BOOLEAN1 = ANY;
delete ; //expect error
// miss an operand
var BOOLEAN2 = delete ;
// delete global variable s
class testADelx {
    s;
    constructor(s) {
        this.s = s;
        delete s; //expect error
    }
}
