//// [tests/cases/conformance/types/members/typesWithPublicConstructor.ts] ////

//// [typesWithPublicConstructor.ts]
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

//// [typesWithPublicConstructor.js]
// public is allowed on a constructor but is not meaningful
class C {
    constructor() { }
}
var c = new C();
var r = c.constructor;
class C2 {
    constructor(x) { }
}
var c2 = new C2();
var r2 = c2.constructor;
