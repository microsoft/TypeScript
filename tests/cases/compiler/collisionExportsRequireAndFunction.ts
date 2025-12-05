//@module: amd
export function exports() {
    return 1;
}
export function require() {
    return "require";
}
namespace m1 {
    function exports() {
        return 1;
    }
    function require() {
        return "require";
    }
}
namespace m2 {
    export function exports() {
        return 1;
    }
    export function require() {
        return "require";
    }
}