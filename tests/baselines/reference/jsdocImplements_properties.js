//// [a.js]
class A { constructor() { this.x = 0; } }
/** @implements A*/
class B {}

/** @implements A*/
class B2 {
    x = 10
}

/** @implements {A}*/
class B3 {
    constructor() { this.x = 10 }
}




//// [a.d.ts]
declare class A {
    x: number;
}
/** @implements A*/
declare class B implements A {
}
/** @implements A*/
declare class B2 implements A {
    x: number;
}
/** @implements {A}*/
declare class B3 implements A {
    x: number;
}
