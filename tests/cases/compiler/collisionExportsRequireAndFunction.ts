//@module: amd
export function exports() {
    return 1;
}
export function require() {
    return "require";
}
module m1 {
    function exports() {
        return 1;
    }
    function require() {
        return "require";
    }
}
module m2 {
    export function exports() {
        return 1;
    }
    export function require() {
        return "require";
    }
}