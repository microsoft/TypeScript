// public is allowed on a constructor but is not meaningful

class C {
    public constructor() { }
}

var c = new C();
var r: () => void = c.constructor;

class C2 {
    public constructor(x: number);
    public constructor(x: any) { }
}

var c2 = new C2();
var r2: (x: number) => void = c2.constructor;