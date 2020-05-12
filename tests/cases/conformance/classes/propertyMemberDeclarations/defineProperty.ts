// @target: es5, esnext
// @useDefineForClassFields: true
var x: "p" = "p"
class A {
    a = this.y
    b
    public c;
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    z = this.y
    declare notEmitted;
}
class B {
    public a;
}
class C extends B {
    declare public a;
    z = this.ka
    constructor(public ka: number) {
        super()
    }
    ki = this.ka
}
