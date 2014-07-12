//// [augmentedTypesEnum2.ts]
// enum then interface
enum e1 { One }

interface e1 {
    foo(): void;
}

// interface then enum works

// enum then class
enum e2 { One };
class e2 { // error
    foo() {
        return 1;
    }
}

//enum then enum - covered
//enum then import - covered

//// [augmentedTypesEnum2.js]
var e1;
(function (e1) {
    e1[e1["One"] = 0] = "One";
})(e1 || (e1 = {}));
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
