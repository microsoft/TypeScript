//@noUnusedLocals:true
//@noUnusedParameters:true

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
