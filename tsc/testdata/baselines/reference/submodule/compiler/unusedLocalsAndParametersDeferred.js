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
function f(a) {
    defered(() => {
        a;
    });
}
f(0);
var fexp = function (a) {
    defered(() => {
        a;
    });
};
fexp(1);
var farrow = (a) => {
    defered(() => {
        a;
    });
};
farrow(2);
let prop1;
class C {
    method(a) {
        defered(() => {
            a;
        });
    }
    set x(v) {
        defered(() => {
            v;
        });
    }
    p = defered(() => {
        prop1;
    });
}
new C();
let prop2;
var E = class {
    method(a) {
        defered(() => {
            a;
        });
    }
    set x(v) {
        defered(() => {
            v;
        });
    }
    p = defered(() => {
        prop2;
    });
};
new E();
var o = {
    method(a) {
        defered(() => {
            a;
        });
    },
    set x(v) {
        defered(() => {
            v;
        });
    },
    p: defered(() => {
        prop1;
    })
};
o;
for (let i in o) {
    defered(() => {
        i;
    });
}
for (let i of [1, 2, 3]) {
    defered(() => {
        i;
    });
}
for (let i = 0; i < 10; i++) {
    defered(() => {
        i;
    });
}
const condition = false;
if (condition) {
    const c = 0;
    defered(() => {
        c;
    });
}
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
var N;
(function (N) {
    var x;
    defered(() => {
        x;
    });
})(N || (N = {}));
N;
