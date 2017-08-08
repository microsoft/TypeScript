//// [objectTypeHidingMembersOfObjectAssignmentCompat.ts]
interface I {
    toString(): void;
}

var i: I;
var o: Object;
o = i; // error
i = o; // ok

class C {
    toString(): void { }
}
var c: C;
o = c; // error
c = o; // ok

var a = {
    toString: () => { }
}
o = a; // error
a = o; // ok

//// [objectTypeHidingMembersOfObjectAssignmentCompat.js]
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
var i;
var o;
o = i; // error
i = o; // ok
var C = (function () {
    function C() {
    }
    C.prototype.toString = function () { };
    __names(C.prototype, ["toString"]);
    return C;
}());
var c;
o = c; // error
c = o; // ok
var a = {
    toString: function () { }
};
o = a; // error
a = o; // ok
