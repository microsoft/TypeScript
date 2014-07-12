//// [numericClassMembers1.js]
var C234 = (function () {
    function C234() {
        this[0] = 1;
        this[0.0] = 2;
    }
    return C234;
})();

var C235 = (function () {
    function C235() {
        this[0.0] = 1;
        this['0'] = 2;
    }
    return C235;
})();

var C236 = (function () {
    function C236() {
        this['0.0'] = 1;
        this['0'] = 2;
    }
    return C236;
})();
