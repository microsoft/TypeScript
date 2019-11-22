//// [definePropertyESNext.ts]
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


//// [definePropertyESNext.js]
var x = "p";
class A {
    y;
    a = 12;
    b;
    ["computed"] = 13;
    [x] = 14;
    m() { }
    constructor(y) {
        this.y = y;
    }
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
