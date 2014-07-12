//// [assignmentCompatBug2.js]
var b2 = { a: 0 };

b2 = { a: 0 }; // error

b2 = { b: 0, a: 0 };

var b3;

b3 = {
    f: function (n) {
        return 0;
    },
    g: function (s) {
        return 0;
    },
    m: 0
}; // ok

b3 = {
    f: function (n) {
        return 0;
    },
    g: function (s) {
        return 0;
    }
}; // error

b3 = {
    f: function (n) {
        return 0;
    },
    m: 0
}; // error

b3 = {
    f: function (n) {
        return 0;
    },
    g: function (s) {
        return 0;
    },
    m: 0,
    n: 0,
    k: function (a) {
        return null;
    }
}; // ok

b3 = {
    f: function (n) {
        return 0;
    },
    g: function (s) {
        return 0;
    },
    n: 0,
    k: function (a) {
        return null;
    }
}; // error
