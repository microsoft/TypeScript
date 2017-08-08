//// [augmentedTypesEnum2.ts]
// enum then interface
enum e1 { One } // error

interface e1 { // error
    foo(): void;
}

// interface then enum works

// enum then class
enum e2 { One }; // error
class e2 { // error
    foo() {
        return 1;
    }
}

//enum then enum - covered
//enum then import - covered

//// [augmentedTypesEnum2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
// enum then interface
var e1;
(function (e1) {
    e1[e1["One"] = 0] = "One";
})(e1 || (e1 = {})); // error
// interface then enum works
// enum then class
var e2;
(function (e2) {
    e2[e2["One"] = 0] = "One";
})(e2 || (e2 = {}));
; // error
var e2 = (function () {
    function e2() {
    }
    e2.prototype.foo = function () {
        return 1;
    };
    __names(e2.prototype, ["foo"]);
    return e2;
}());
//enum then enum - covered
//enum then import - covered 
