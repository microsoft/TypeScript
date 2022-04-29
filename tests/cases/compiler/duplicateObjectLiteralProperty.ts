// @target: ES5
var x = {
    a: 1,
    b: true, // OK
    a: 56,   // Duplicate
    \u0061: "ss", // Duplicate
    a: {
        c: 1,
        "c": 56, // Duplicate
    }
};


var y = {
    get a() { return 0; },
    set a(v: number) { },
    get a() { return 0; }
};
