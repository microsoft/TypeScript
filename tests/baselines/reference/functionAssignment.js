//// [functionAssignment.js]
function f(n) {
}
f(function () {
});

var barbaz;
var test;

test.get(function (param) {
    var x = barbaz.get(function () {
    });
});

function f2(n) {
}
f2(function () {
    var n = '';
    n = 4;
});

function f3(a) {
}

f3({ a: 0, b: 0 });

function callb(a) {
}

callb(function (a) {
    a.length;
});
