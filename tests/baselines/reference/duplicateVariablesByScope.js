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
var C = /** @class */ (function () {
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
    return C;
}());
