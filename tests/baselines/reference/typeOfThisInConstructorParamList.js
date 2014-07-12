//// [typeOfThisInConstructorParamList.js]
//type of 'this' in constructor param list is the class instance type (error)
var ErrClass = (function () {
    // Should be an error
    function ErrClass(f) {
        if (typeof f === "undefined") { f = this; }
    }
    return ErrClass;
})();
