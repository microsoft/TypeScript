//// [defineProperty.ts]
var x: "p" = "p"
class A {
    a = this.y
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    z = this.y
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


//// [defineProperty.js]
var x = "p";
class A {
    y;
    a = this.y;
    b;
    ["computed"] = 13;
    [x] = 14;
    m() { }
    constructor(y) {
        this.y = y;
    }
    z = this.y;
}
class B {
}
class C extends B {
    ka;
    z = this.ka;
    constructor(ka) {
        super();
        this.ka = ka;
    }
    ki = this.ka;
}
