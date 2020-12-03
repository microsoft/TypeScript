//// [exhaustiveSwitchImplicitReturn.ts]
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


//// [exhaustiveSwitchImplicitReturn.js]
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
