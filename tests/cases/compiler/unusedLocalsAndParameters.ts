// @target: es2015
// @strict: false
//@noUnusedLocals:true
//@noUnusedParameters:true

export { };

// function declaration parameter
function f(a) {
}
f(0);

// function expression parameter
var fexp = function (a) {
};

fexp(0);

// arrow function parameter
var farrow = (a) => {
};

class C {
    // Method declaration parameter
    method(a) {
    }
    // Accessor declaration parameter
    set x(v: number) {
    }
}

var E = class {
    // Method declaration parameter
    method(a) {
    }
    // Accessor declaration parameter
    set x(v: number) {
    }
}

var o = {
    // Object literal method declaration parameter
    method(a) {
    },
    // Accessor declaration parameter
    set x(v: number) {
    }
};

o;

// in a for..in statement
for (let i in o) {
}

// in a for..of statement
for (let i of [1, 2, 3]) {
}

// in a for. statement
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
