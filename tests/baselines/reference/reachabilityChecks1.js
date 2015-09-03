//// [reachabilityChecks1.ts]

while (true);
var x = 1;

module A {
    while (true);
    let x;
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

module B {
    for (; ;);
    module C {
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



//// [reachabilityChecks1.js]
while (true)
    ;
var x = 1;
var A;
(function (A) {
    while (true)
        ;
    var x;
})(A || (A = {}));
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
    var A = (function () {
        function A() {
        }
        return A;
    })();
}
var B;
(function (B) {
    for (;;)
        ;
})(B || (B = {}));
function f3() {
    do {
    } while (true);
    var E;
    (function (E) {
        E[E["X"] = 1] = "X";
    })(E || (E = {}));
}
function f4() {
    if (true) {
        throw new Error();
    }
    var E;
    (function (E) {
        E[E["X"] = 1] = "X";
    })(E || (E = {}));
}
