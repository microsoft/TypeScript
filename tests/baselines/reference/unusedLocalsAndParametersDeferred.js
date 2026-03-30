//// [tests/cases/compiler/unusedLocalsAndParametersDeferred.ts] ////

//// [unusedLocalsAndParametersDeferred.ts]
export { };

function deferred<T>(a: () => T): T {
    return a();
}

// function declaration parameter
function f(a) {
    deferred(() => {
        a;
    });
}
f(0);

// function expression parameter
var fexp = function (a) {
    deferred(() => {
        a;
    });
};
fexp(1);

// arrow function parameter
var farrow = (a) => {
    deferred(() => {
        a;
    });
};
farrow(2);

let prop1;

class C {
    // Method declaration parameter
    method(a) {
        deferred(() => {
            a;
        });
    }
    // Accessor declaration parameter
    set x(v: number) {
        deferred(() => {
            v;
        });
    }
    // in a property initializer
    p = deferred(() => {
        prop1;
    });
}

new C();

let prop2;

var E = class {
    // Method declaration parameter
    method(a) {
        deferred(() => {
            a;
        });
    }
    // Accessor declaration parameter
    set x(v: number) {
        deferred(() => {
            v;
        });
    }
    // in a property initializer
    p = deferred(() => {
        prop2;
    });
}

new E();


var o = {
    // Object literal method declaration parameter
    method(a) {
        deferred(() => {
            a;
        });
    },
    // Accessor declaration parameter
    set x(v: number) {
        deferred(() => {
            v;
        });
    },
    // in a property initializer
    p: deferred(() => {
        prop1;
    })
};

o;

// in a for..in statement
for (let i in o) {
    deferred(() => {
        i;
    });
}

// in a for..of statement
for (let i of [1,2,3]) {
    deferred(() => {
        i;
    });
}

// in a for. statement
for (let i = 0; i < 10; i++) {
    deferred(() => {
        i;
    });
}

// in a block

const condition = false;
if (condition) {
    const c = 0;
    deferred(() => {
        c;
    });
}

// in try/catch/finally
try {
    const a = 0;
    deferred(() => {
        a;
    });
}
catch (e) {
    const c = 1;
    deferred(() => {
        c;
    });
}
finally {
    const c = 0;
    deferred(() => {
        c;
    });
}


// in a namespace
namespace N {
    var x;
    deferred(() => {
        x;
    });
}
N;
    

//// [unusedLocalsAndParametersDeferred.js]
function deferred(a) {
    return a();
}
// function declaration parameter
function f(a) {
    deferred(() => {
        a;
    });
}
f(0);
// function expression parameter
var fexp = function (a) {
    deferred(() => {
        a;
    });
};
fexp(1);
// arrow function parameter
var farrow = (a) => {
    deferred(() => {
        a;
    });
};
farrow(2);
let prop1;
class C {
    constructor() {
        // in a property initializer
        this.p = deferred(() => {
            prop1;
        });
    }
    // Method declaration parameter
    method(a) {
        deferred(() => {
            a;
        });
    }
    // Accessor declaration parameter
    set x(v) {
        deferred(() => {
            v;
        });
    }
}
new C();
let prop2;
var E = class {
    constructor() {
        // in a property initializer
        this.p = deferred(() => {
            prop2;
        });
    }
    // Method declaration parameter
    method(a) {
        deferred(() => {
            a;
        });
    }
    // Accessor declaration parameter
    set x(v) {
        deferred(() => {
            v;
        });
    }
};
new E();
var o = {
    // Object literal method declaration parameter
    method(a) {
        deferred(() => {
            a;
        });
    },
    // Accessor declaration parameter
    set x(v) {
        deferred(() => {
            v;
        });
    },
    // in a property initializer
    p: deferred(() => {
        prop1;
    })
};
o;
// in a for..in statement
for (let i in o) {
    deferred(() => {
        i;
    });
}
// in a for..of statement
for (let i of [1, 2, 3]) {
    deferred(() => {
        i;
    });
}
// in a for. statement
for (let i = 0; i < 10; i++) {
    deferred(() => {
        i;
    });
}
// in a block
const condition = false;
if (condition) {
    const c = 0;
    deferred(() => {
        c;
    });
}
// in try/catch/finally
try {
    const a = 0;
    deferred(() => {
        a;
    });
}
catch (e) {
    const c = 1;
    deferred(() => {
        c;
    });
}
finally {
    const c = 0;
    deferred(() => {
        c;
    });
}
// in a namespace
var N;
(function (N) {
    var x;
    deferred(() => {
        x;
    });
})(N || (N = {}));
N;
export {};
