// @target: ES6

// global
const c = "string";

var n: number;
var b: boolean;

// for scope
for (const c = 0; c < 10; n = c ) {
    // for block
    const c = false;
    b = c;
}

