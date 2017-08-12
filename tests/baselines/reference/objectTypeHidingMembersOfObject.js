//// [objectTypeHidingMembersOfObject.ts]
// all of these valueOf calls should return the type shown in the overriding signatures here

class C {
    valueOf() { }
}

var c: C;
var r1: void = c.valueOf();

interface I {
    valueOf(): void;
}

var i: I;
var r2: void = i.valueOf();

var a = {
    valueOf: () => { }
}

var r3: void = a.valueOf();

var b: {
    valueOf(): void;
}

var r4: void = b.valueOf();

//// [objectTypeHidingMembersOfObject.js]
// all of these valueOf calls should return the type shown in the overriding signatures here
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
var C = (function () {
    function C() {
    }
    C.prototype.valueOf = function () { };
    __names(C.prototype, ["valueOf"]);
    return C;
}());
var c;
var r1 = c.valueOf();
var i;
var r2 = i.valueOf();
var a = {
    valueOf: function () { }
};
var r3 = a.valueOf();
var b;
var r4 = b.valueOf();
