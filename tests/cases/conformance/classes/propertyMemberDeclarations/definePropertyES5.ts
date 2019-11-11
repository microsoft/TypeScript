// @target: es5
// @useDefineForClassFields: true
var x: "p" = "p"
class A {
    a = this.y
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    z = this.y
}
