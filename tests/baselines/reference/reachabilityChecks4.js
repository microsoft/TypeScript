//// [reachabilityChecks4.ts]
function foo(x, y) {
    switch (x) {
        case 1:
        case 2:
            return 1;
        case 3:
            if (y) {
                return 2;
            }
        case 4:
            return 3;
    }
}

//// [reachabilityChecks4.js]
function foo(x, y) {
    switch (x) {
        case 1:
        case 2:
            return 1;
        case 3:
            if (y) {
                return 2;
            }
        case 4:
            return 3;
    }
}
