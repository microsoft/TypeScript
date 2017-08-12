//// [narrowedConstInMethod.ts]
// Fixes #10501, possibly null 'x'
function f() {
    const x: string | null = <any>{};
    if (x !== null) {
        return {
            bar() { return x.length; }  // ok
        };
    }
}

function f2() {
    const x: string | null = <any>{};
    if (x !== null) {
        return class {
            bar() { return x.length; }  // ok
        };
    }
}


//// [narrowedConstInMethod.js]
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
// Fixes #10501, possibly null 'x'
function f() {
    var x = {};
    if (x !== null) {
        return {
            bar: function () { return x.length; } // ok
        };
    }
}
function f2() {
    var x = {};
    if (x !== null) {
        return (function () {
            function class_1() {
            }
            class_1.prototype.bar = function () { return x.length; }; // ok
            __names(class_1.prototype, ["bar"]);
            return class_1;
        }());
    }
}
