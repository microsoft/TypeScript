// @strictNullChecks: true

function a(arg: (> 0)): true {
    return !!arg;
}

function b(arg: (>= 0)): boolean {
    return !!arg;
}
