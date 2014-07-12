//// [duplicateObjectLiteralProperty.js]
var x = {
    a: 1,
    b: true,
    a: 56,
    \u0061: "ss",
    a: {
        c: 1,
        "c": 56
    }
};

var y = {
    get a() {
        return 0;
    },
    set a(v) {
    },
    get a() {
        return 0;
    }
};
