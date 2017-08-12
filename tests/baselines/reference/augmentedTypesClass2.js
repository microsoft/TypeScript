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
// class then interface
var c11 = (function () {
    function c11() {
    }
    var proto_1 = c11.prototype;
    proto_1.foo = function () {
        return 1;
    };
    return c11;
}());
// class then class - covered
// class then enum 
var c33 = (function () {
    function c33() {
    }
    var proto_2 = c33.prototype;
    proto_2.foo = function () {
        return 1;
    };
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
    var proto_3 = c44.prototype;
    proto_3.foo = function () {
        return 1;
    };
    return c44;
}());
