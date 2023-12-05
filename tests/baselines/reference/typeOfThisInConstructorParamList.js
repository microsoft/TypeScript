//// [tests/cases/conformance/expressions/thisKeyword/typeOfThisInConstructorParamList.ts] ////

//// [typeOfThisInConstructorParamList.ts]
//type of 'this' in constructor param list is the class instance type (error)
class ErrClass {
    // Should be an error
    constructor(f = this) { }
}


//// [typeOfThisInConstructorParamList.js]
//type of 'this' in constructor param list is the class instance type (error)
var ErrClass = /** @class */ (function () {
    // Should be an error
    function ErrClass(f) {
        if (f === void 0) { f = this; }
    }
    return ErrClass;
}());
