// @target: es5
// @useDefineForClassFields: true
var x: "p" = "p"
class A {
    a = 12
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
}
