//// [duplicateVariablesByScope.ts]
// duplicate local variables are only reported at global scope

module M {
    for (var j = 0; j < 10; j++) {
    }

    for (var j = 0; j < 10; j++) {
    }
}

function foo() {
    var x = 2;
    var x = 1;
    if (true) {
        var result = 1;
    }
    else {
        var result = 2;
    }
}

class C {
    foo() {
        try {
            var x = 1;
        }
        catch (e) {
            var x = 2;
        }
    }
}

//// [duplicateVariablesByScope.js]
// duplicate local variables are only reported at global scope
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
var M;
(function (M) {
    for (var j = 0; j < 10; j++) {
    }
    for (var j = 0; j < 10; j++) {
    }
})(M || (M = {}));
function foo() {
    var x = 2;
    var x = 1;
    if (true) {
        var result = 1;
    }
    else {
        var result = 2;
    }
}
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        try {
            var x = 1;
        }
        catch (e) {
            var x = 2;
        }
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
