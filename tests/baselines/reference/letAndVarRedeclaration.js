//// [letAndVarRedeclaration.ts]
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

module M0 {
    let x2;
    var x2;
    function x2() { }
}

module M1 {
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

module M2 {
    let x11;
    for (var x11; ;) {
    }
}

//// [letAndVarRedeclaration.js]
let e0;
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
var M0;
(function (M0) {
    let x2;
    var x2;
    function x2() { }
})(M0 || (M0 = {}));
var M1;
(function (M1) {
    let x2;
    {
        var x2;
    }
    {
        function x2() { }
    }
})(M1 || (M1 = {}));
let x11;
for (var x11;;) {
}
function f2() {
    let x11;
    for (var x11;;) {
    }
}
var M2;
(function (M2) {
    let x11;
    for (var x11;;) {
    }
})(M2 || (M2 = {}));
