//// [defaultValueInConstructorOverload1.ts]
class C {
    constructor(x = '');
    constructor(x = '') {
    }
}

//// [defaultValueInConstructorOverload1.js]
var C = (function () {
    function C() {
        var x = (arguments[0] === void 0) ? '' : arguments[0];
    }
    return C;
})();
