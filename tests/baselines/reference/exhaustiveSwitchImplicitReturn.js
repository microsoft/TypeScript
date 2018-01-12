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
