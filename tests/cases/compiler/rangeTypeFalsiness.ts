// @allowUnreachableCode: false
// @strictNullChecks: true

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
