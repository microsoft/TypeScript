// @allowUnreachableCode: true

// @target: es6

let e0
var e0;
function e0() { }

function f0() {
    let x1;
    var x1;
    function x1() { }
}

function f1() {
    let x;
    {
        var x;
    }
    {
        function x() { }
    }
}

namespace M0 {
    let x2;
    var x2;
    function x2() { }
}

namespace M1 {
    let x2;
    {
        var x2;
    }
    {
        function x2() { }
    }
}

let x11;
for (var x11; ;) {
}

function f2() {
    let x11;
    for (var x11; ;) {
    }
}

namespace M2 {
    let x11;
    for (var x11; ;) {
    }
}