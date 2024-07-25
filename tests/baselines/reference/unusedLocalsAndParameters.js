//// [tests/cases/compiler/unusedLocalsAndParameters.ts] ////

//// [unusedLocalsAndParameters.ts]
export { };

// function declaration paramter
function f(a) {
}
f(0);

// function expression paramter
var fexp = function (a) {
};

fexp(0);

// arrow function paramter
var farrow = (a) => {
};

class C {
    // Method declaration paramter
    method(a) {
    }
    // Accessor declaration paramter
    set x(v: number) {
    }
}

var E = class {
    // Method declaration paramter
    method(a) {
    }
    // Accessor declaration paramter
    set x(v: number) {
    }
}

var o = {
    // Object literal method declaration paramter
    method(a) {
    },
    // Accessor declaration paramter
    set x(v: number) {
    }
};

o;

// in a for..in statment
for (let i in o) {
}

// in a for..of statment
for (let i of [1, 2, 3]) {
}

// in a for. statment
for (let i = 0, n; i < 10; i++) {
}

// in a block

const condition = false;
if (condition) {
    const c = 0;
}

// in try/catch/finally
try {
    const a = 0;
}
catch (e) {
    const c = 1;
}
finally {
    const c = 0;
}


// in a namespace
namespace N {
    var x;
}

for (let x: y) {
    z(x);
}


//// [unusedLocalsAndParameters.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function declaration paramter
function f(a) {
}
f(0);
// function expression paramter
var fexp = function (a) {
};
fexp(0);
// arrow function paramter
var farrow = function (a) {
};
var C = /** @class */ (function () {
    function C() {
    }
    // Method declaration paramter
    C.prototype.method = function (a) {
    };
    Object.defineProperty(C.prototype, "x", {
        // Accessor declaration paramter
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var E = /** @class */ (function () {
    function class_1() {
    }
    // Method declaration paramter
    class_1.prototype.method = function (a) {
    };
    Object.defineProperty(class_1.prototype, "x", {
        // Accessor declaration paramter
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
var o = {
    // Object literal method declaration paramter
    method: function (a) {
    },
    // Accessor declaration paramter
    set x(v) {
    }
};
o;
// in a for..in statment
for (var i in o) {
}
// in a for..of statment
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var i = _a[_i];
}
// in a for. statment
for (var i = 0, n = void 0; i < 10; i++) {
}
// in a block
var condition = false;
if (condition) {
    var c = 0;
}
// in try/catch/finally
try {
    var a = 0;
}
catch (e) {
    var c = 1;
}
finally {
    var c = 0;
}
// in a namespace
var N;
(function (N) {
    var x;
})(N || (N = {}));
for (var x = void 0, z = (void 0).z; (x); )
    ;
