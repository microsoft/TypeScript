function foo(y = class {static c = x}, x = 1) {
    y.c
}
function foo2(y = class {[x] = x}, x = 1) {
}