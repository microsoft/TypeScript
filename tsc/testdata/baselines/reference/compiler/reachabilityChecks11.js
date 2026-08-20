//// [tests/cases/compiler/reachabilityChecks11.ts] ////

//// [reachabilityChecks11.ts]
// while (true);
var x = 1;

namespace A {
    while (true);
    let x;
}

namespace A1 {
    do {} while(true);
    namespace A {
        interface F {}
    }
}

namespace A2 {
    while (true);
    namespace A {
        var x = 1;
    }
}

namespace A3 {
    while (true);
    type T = string;
}

namespace A4 {
    while (true);
    namespace A {
        const enum E { X }
    }
}

function f1(x) {
    if (x) {
        return;
    }
    else {
        throw new Error("123");
    }
    var x;
}

function f2() {
    return;
    class A {
    }
}

namespace B {
    for (; ;);
    namespace C {
    }
}

function f3() {
    do {
    } while (true);
    enum E {
        X = 1
    }
}

function f4() {
    if (true) {
        throw new Error();
    }
    const enum E {
        X = 1
    }
}



//// [reachabilityChecks11.js]
"use strict";
// while (true);
var x = 1;
var A;
(function (A) {
    while (true)
        ;
    let x;
})(A || (A = {}));
var A1;
(function (A1) {
    do { } while (true);
})(A1 || (A1 = {}));
var A2;
(function (A2) {
    while (true)
        ;
    let A;
    (function (A) {
        var x = 1;
    })(A || (A = {}));
})(A2 || (A2 = {}));
var A3;
(function (A3) {
    while (true)
        ;
})(A3 || (A3 = {}));
var A4;
(function (A4) {
    while (true)
        ;
    let A;
    (function (A) {
        let E;
        (function (E) {
            E[E["X"] = 0] = "X";
        })(E || (E = {}));
    })(A || (A = {}));
})(A4 || (A4 = {}));
function f1(x) {
    if (x) {
        return;
    }
    else {
        throw new Error("123");
    }
    var x;
}
function f2() {
    return;
    class A {
    }
}
var B;
(function (B) {
    for (;;)
        ;
})(B || (B = {}));
function f3() {
    do {
    } while (true);
    let E;
    (function (E) {
        E[E["X"] = 1] = "X";
    })(E || (E = {}));
}
function f4() {
    if (true) {
        throw new Error();
    }
    let E;
    (function (E) {
        E[E["X"] = 1] = "X";
    })(E || (E = {}));
}
