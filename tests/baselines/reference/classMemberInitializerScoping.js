//// [classMemberInitializerScoping.js]
var aaa = 1;
var CCC = (function () {
    function CCC(aaa) {
        this.y = aaa;
        this.y = ''; // was: error, cannot assign string to number
    }
    CCC.staticY = aaa;
    return CCC;
})();

// above is equivalent to this:
var aaaa = 1;
var CCCC = (function () {
    function CCCC(aaaa) {
        this.y = aaaa;
        this.y = '';
    }
    return CCCC;
})();
