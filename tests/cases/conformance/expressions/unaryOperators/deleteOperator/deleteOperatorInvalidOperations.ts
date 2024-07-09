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