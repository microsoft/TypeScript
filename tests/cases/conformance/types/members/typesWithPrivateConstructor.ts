// private constructors are not allowed

class C {
    private constructor() { }
}

var c = new C();
var r: () => void = c.constructor;

class C2 {
    private constructor(x: number);
    private constructor(x: any) { }
}

var c2 = new C2();
var r2: (x: number) => void = c2.constructor;