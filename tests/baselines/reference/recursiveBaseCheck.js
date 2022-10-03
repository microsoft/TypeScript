//// [recursiveBaseCheck.ts]
declare module Module {
    class C extends D {
    }
    export class B extends Module.C {
    }
    export class A extends Module.B {
    }
    export class AmChart extends Module.A {
    }
    export class D extends AmChart {
    }
    export class E extends Module.D {
    }
    export class F extends Module.E {
    }
}


//// [recursiveBaseCheck.js]
