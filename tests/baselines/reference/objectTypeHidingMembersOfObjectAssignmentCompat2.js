//// [objectTypeHidingMembersOfObjectAssignmentCompat2.ts]
interface I {
    toString(): number;
}

var i: I;
var o: Object;
o = i; // error
i = o; // error

class C {
    toString(): number { return 1; }
}
var c: C;
o = c; // error
c = o; // error

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok

//// [objectTypeHidingMembersOfObjectAssignmentCompat2.js]
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
var i;
var o;
o = i; // error
i = o; // error
var C = (function () {
    function C() {
    }
    C.prototype.toString = function () { return 1; };
    __names(C.prototype, ["toString"]);
    return C;
}());
var c;
o = c; // error
c = o; // error
var a = {
    toString: function () { }
};
o = a; // error
a = o; // ok
