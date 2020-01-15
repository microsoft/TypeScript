//// [defineProperty.ts]
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


//// [defineProperty.js]
var x = "p";
class A {
    y;
    a = this.y;
    b;
    c;
    ["computed"] = 13;
    [x] = 14;
    m() { }
    constructor(y) {
        this.y = y;
    }
    z = this.y;
}
class B {
    a;
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
