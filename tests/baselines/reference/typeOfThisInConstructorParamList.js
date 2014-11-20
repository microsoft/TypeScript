//// [typeOfThisInConstructorParamList.ts]
//type of 'this' in constructor param list is the class instance type (error)
class ErrClass {
    // Should be an error
    constructor(f = this) { }
}


//// [typeOfThisInConstructorParamList.js]
//type of 'this' in constructor param list is the class instance type (error)
var ErrClass = (function () {
    // Should be an error
    function ErrClass() {
        var f = (arguments[0] === void 0) ? this : arguments[0];
    }
    return ErrClass;
})();
