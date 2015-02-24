// @target: es5
var v = {
    get [0 + 1]() { return 0 },
    set [0 + 1](v: string) { } //No error
}