//// [augmentedTypesClass2.ts]
// Checking class with other things in type space not value space

// class then interface
class c11 {
    foo() {
        return 1;
    }
}

interface c11 {
    bar(): void;
}

// class then class - covered
// class then enum 
class c33 {
    foo() {
        return 1;
    }
}
enum c33 { One };

// class then import
class c44 {
    foo() {
        return 1;
    }
}



//// [augmentedTypesClass2.js]
// Checking class with other things in type space not value space
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
// class then interface
var c11 = (function () {
    function c11() {
    }
    c11.prototype.foo = function () {
        return 1;
    };
    __names(c11.prototype, ["foo"]);
    return c11;
}());
// class then class - covered
// class then enum 
var c33 = (function () {
    function c33() {
    }
    c33.prototype.foo = function () {
        return 1;
    };
    __names(c33.prototype, ["foo"]);
    return c33;
}());
(function (c33) {
    c33[c33["One"] = 0] = "One";
})(c33 || (c33 = {}));
;
// class then import
var c44 = (function () {
    function c44() {
    }
    c44.prototype.foo = function () {
        return 1;
    };
    __names(c44.prototype, ["foo"]);
    return c44;
}());
