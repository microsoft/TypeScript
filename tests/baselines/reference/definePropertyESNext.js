//// [definePropertyESNext.ts]
var x: "p" = "p"
class A {
    a = 12
    b
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
}
class B {
}
class C extends B {
    z = 1
    constructor(public ka: number) {
        super()
    }
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
    z = 1;
    constructor(ka) {
        super();
        this.ka = ka;
    }
}
