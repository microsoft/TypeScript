//// [tests/cases/compiler/unusedLocalsAndParametersDeferred.ts] ////

//// [unusedLocalsAndParametersDeferred.ts]
export { };

function defered<T>(a: () => T): T {
    return a();
}

// function declaration paramter
function f(a) {
    defered(() => {
        a;
    });
}
f(0);

// function expression paramter
var fexp = function (a) {
    defered(() => {
        a;
    });
};
fexp(1);

// arrow function paramter
var farrow = (a) => {
    defered(() => {
        a;
    });
};
farrow(2);

let prop1;

class C {
    // Method declaration paramter
    method(a) {
        defered(() => {
            a;
        });
    }
    // Accessor declaration paramter
    set x(v: number) {
        defered(() => {
            v;
        });
    }
    // in a property initalizer
    p = defered(() => {
        prop1;
    });
}

new C();

let prop2;

var E = class {
    // Method declaration paramter
    method(a) {
        defered(() => {
            a;
        });
    }
    // Accessor declaration paramter
    set x(v: number) {
        defered(() => {
            v;
        });
    }
    // in a property initalizer
    p = defered(() => {
        prop2;
    });
}

new E();


var o = {
    // Object literal method declaration paramter
    method(a) {
        defered(() => {
            a;
        });
    },
    // Accessor declaration paramter
    set x(v: number) {
        defered(() => {
            v;
        });
    },
    // in a property initalizer
    p: defered(() => {
        prop1;
    })
};

o;

// in a for..in statment
for (let i in o) {
    defered(() => {
        i;
    });
}

// in a for..of statment
for (let i of [1,2,3]) {
    defered(() => {
        i;
    });
}

// in a for. statment
for (let i = 0; i < 10; i++) {
    defered(() => {
        i;
    });
}

// in a block

const condition = false;
if (condition) {
    const c = 0;
    defered(() => {
        c;
    });
}

// in try/catch/finally
try {
    const a = 0;
    defered(() => {
        a;
    });
}
catch (e) {
    const c = 1;
    defered(() => {
        c;
    });
}
finally {
    const c = 0;
    defered(() => {
        c;
    });
}


// in a namespace
namespace N {
    var x;
    defered(() => {
        x;
    });
}
N;
    

//// [unusedLocalsAndParametersDeferred.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defered(a) {
    return a();
}
// function declaration paramter
function f(a) {
    defered(function () {
        a;
    });
}
f(0);
// function expression paramter
var fexp = function (a) {
    defered(function () {
        a;
    });
};
fexp(1);
// arrow function paramter
var farrow = function (a) {
    defered(function () {
        a;
    });
};
farrow(2);
var prop1;
var C = /** @class */ (function () {
    function C() {
        // in a property initalizer
        this.p = defered(function () {
            prop1;
        });
    }
    // Method declaration paramter
    C.prototype.method = function (a) {
        defered(function () {
            a;
        });
    };
    Object.defineProperty(C.prototype, "x", {
        // Accessor declaration paramter
        set: function (v) {
            defered(function () {
                v;
            });
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
new C();
var prop2;
var E = /** @class */ (function () {
    function class_1() {
        // in a property initalizer
        this.p = defered(function () {
            prop2;
        });
    }
    // Method declaration paramter
    class_1.prototype.method = function (a) {
        defered(function () {
            a;
        });
    };
    Object.defineProperty(class_1.prototype, "x", {
        // Accessor declaration paramter
        set: function (v) {
            defered(function () {
                v;
            });
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
new E();
var o = {
    // Object literal method declaration paramter
    method: function (a) {
        defered(function () {
            a;
        });
    },
    // Accessor declaration paramter
    set x(v) {
        defered(function () {
            v;
        });
    },
    // in a property initalizer
    p: defered(function () {
        prop1;
    })
};
o;
var _loop_1 = function (i) {
    defered(function () {
        i;
    });
};
// in a for..in statment
for (var i in o) {
    _loop_1(i);
}
var _loop_2 = function (i) {
    defered(function () {
        i;
    });
};
// in a for..of statment
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var i = _a[_i];
    _loop_2(i);
}
var _loop_3 = function (i) {
    defered(function () {
        i;
    });
};
// in a for. statment
for (var i = 0; i < 10; i++) {
    _loop_3(i);
}
// in a block
var condition = false;
if (condition) {
    var c_1 = 0;
    defered(function () {
        c_1;
    });
}
// in try/catch/finally
try {
    var a_1 = 0;
    defered(function () {
        a_1;
    });
}
catch (e) {
    var c_2 = 1;
    defered(function () {
        c_2;
    });
}
finally {
    var c_3 = 0;
    defered(function () {
        c_3;
    });
}
// in a namespace
var N;
(function (N) {
    var x;
    defered(function () {
        x;
    });
})(N || (N = {}));
N;
