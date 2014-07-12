//// [augmentedTypesClass.js]
//// class then var
var c1 = (function () {
    function c1() {
    }
    c1.prototype.foo = function () {
    };
    return c1;
})();
var c1 = 1;

//// class then enum
var c4 = (function () {
    function c4() {
    }
    c4.prototype.foo = function () {
    };
    return c4;
})();
var c4;
(function (c4) {
    c4[c4["One"] = 0] = "One";
})(c4 || (c4 = {})); // error
