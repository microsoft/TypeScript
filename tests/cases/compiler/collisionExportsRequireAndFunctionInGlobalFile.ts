function exports() {
    return 1;
}
function require() {
    return "require";
}
module m3 {
    function exports() {
        return 1;
    }
    function require() {
        return "require";
    }
}
module m4 {
    export function exports() {
        return 1;
    }
    export function require() {
        return "require";
    }
}