// @target: esnext
// @useDefineForClassFields: true
var x: "p" = "p"
class A {
    a = 12
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    declare notEmitted;
}
class B {
}
class C extends B {
    z = this.ka
    constructor(public ka: number) {
        super()
    }
    ki = this.ka
}
