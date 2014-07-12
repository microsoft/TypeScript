//// [typeOfThisInConstructorParamList.ts]
//type of 'this' in constructor param list is the class instance type (error)
class ErrClass {
    // Should be an error
    constructor(f = this) { }
}


//// [typeOfThisInConstructorParamList.js]
var ErrClass = (function () {
    function ErrClass(f) {
        if (f === void 0) { f = this; }
    }
    return ErrClass;
})();
