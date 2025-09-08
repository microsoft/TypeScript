function fn() {
    return fn.n;
}
namespace fn {
    export var n = 1;
}
