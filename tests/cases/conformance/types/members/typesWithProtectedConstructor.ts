// @declaration: true

class C {
    protected constructor() { }
}

var c = new C(); // error C is protected
var r: () => void = c.constructor;

class C2 {
    protected constructor(x: number);
    protected constructor(x: any) { }
}

var c2 = new C2(); // error C2 is protected
var r2: (x: number) => void = c2.constructor;