//// [augmentedTypesEnum2.js]
// enum then interface
var e1;
(function (e1) {
    e1[e1["One"] = 0] = "One";
})(e1 || (e1 = {}));

// interface then enum works
// enum then class
var e2;
(function (e2) {
    e2[e2["One"] = 0] = "One";
})(e2 || (e2 = {}));
;
var e2 = (function () {
    function e2() {
    }
    e2.prototype.foo = function () {
        return 1;
    };
    return e2;
})();
//enum then enum - covered
//enum then import - covered
