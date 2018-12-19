//// [rangeTypeFalsiness.ts]
function a(arg: (> 0)) {
    if(!arg) {
        return false;
    }
    else {
        return true;
    }
}

function b(arg: (>= 0)) {
    if (!arg) {
        return false;
    }
    else {
        return true;
    }
}


//// [rangeTypeFalsiness.js]
function a(arg) {
    if (!arg) {
        return false;
    }
    else {
        return true;
    }
}
function b(arg) {
    if (!arg) {
        return false;
    }
    else {
        return true;
    }
}
