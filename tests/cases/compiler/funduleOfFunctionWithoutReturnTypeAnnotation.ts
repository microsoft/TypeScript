function fn() {
    return fn.n;
}
module fn {
    export var n = 1;
}
