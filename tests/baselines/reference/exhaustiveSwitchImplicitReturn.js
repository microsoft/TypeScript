//// [exhaustiveSwitchImplicitReturn.ts]
enum E1 {
    A = "a",
    B = "b"
}

enum E2 {
    A = 0,
    B = 1
}

enum E3 {
    A,
    B
}

function foo1(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }
}

function foo2(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }

    let unusedVariable;
}

function foo3(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }

    function neverCalled() {}
}

function foo4(bar: "a"): number {
    switch(bar) {
        case "a":
            return 1;
    }

    foo3(bar);
}

function foo5(bar: "a" | "b"): number {
    switch(bar) {
        case "a":
            return 1;
    }
}

function foo6(bar: "a", a: boolean, b: boolean): number {
    if (a) {
        switch (bar) {
            case "a": return 1;
        }
    }
    else {
        switch (b) {
            case true: return -1;
            case false: return 0;
        }
    }
}

function foo7(value: "a" | "b") {
    switch (value) {
        case E1.A:
            return value;
        case E1.B:
            return value;
    }
}

function foo8(value: "a" | "b") {
    switch (value) {
        case E1.A:
            return value;
    }
}

function foo9(value: 0 | 1) {
    switch (value) {
        case E2.A:
            return value;
        case E2.B:
            return value;
    }
}

function foo10(value: 0 | 1) {
    switch (value) {
        case E2.A:
            return value;
    }
}

function foo11(value: 0 | 1) {
    switch (value) {
        case E3.A:
            return value;
        case E3.B:
            return value;
    }
}

function foo12(value: 0 | 1) {
    switch (value) {
        case E3.A:
            return value;
    }
}


//// [exhaustiveSwitchImplicitReturn.js]
var E1;
(function (E1) {
    E1["A"] = "a";
    E1["B"] = "b";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["A"] = 0] = "A";
    E2[E2["B"] = 1] = "B";
})(E2 || (E2 = {}));
var E3;
(function (E3) {
    E3[E3["A"] = 0] = "A";
    E3[E3["B"] = 1] = "B";
})(E3 || (E3 = {}));
function foo1(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
}
function foo2(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
    var unusedVariable;
}
function foo3(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
    function neverCalled() { }
}
function foo4(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
    foo3(bar);
}
function foo5(bar) {
    switch (bar) {
        case "a":
            return 1;
    }
}
function foo6(bar, a, b) {
    if (a) {
        switch (bar) {
            case "a": return 1;
        }
    }
    else {
        switch (b) {
            case true: return -1;
            case false: return 0;
        }
    }
}
function foo7(value) {
    switch (value) {
        case E1.A:
            return value;
        case E1.B:
            return value;
    }
}
function foo8(value) {
    switch (value) {
        case E1.A:
            return value;
    }
}
function foo9(value) {
    switch (value) {
        case E2.A:
            return value;
        case E2.B:
            return value;
    }
}
function foo10(value) {
    switch (value) {
        case E2.A:
            return value;
    }
}
function foo11(value) {
    switch (value) {
        case E3.A:
            return value;
        case E3.B:
            return value;
    }
}
function foo12(value) {
    switch (value) {
        case E3.A:
            return value;
    }
}
