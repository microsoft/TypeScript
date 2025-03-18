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
function f(a) {
}
f(0);
var fexp = function (a) {
};
fexp(0);
var farrow = (a) => {
};
class C {
    method(a) {
    }
    set x(v) {
    }
}
var E = class {
    method(a) {
    }
    set x(v) {
    }
};
var o = {
    method(a) {
    },
    set x(v) {
    }
};
o;
for (let i in o) {
}
for (let i of [1, 2, 3]) {
}
for (let i = 0, n; i < 10; i++) {
}
const condition = false;
if (condition) {
    const c = 0;
}
try {
    const a = 0;
}
catch (e) {
    const c = 1;
}
finally {
    const c = 0;
}
var N;
(function (N) {
    var x;
})(N || (N = {}));
for (let x, { z }; (x); )
    ;
