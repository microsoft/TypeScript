//// [tests/cases/compiler/superCallAssignResult.ts] ////

//// [superCallAssignResult.ts]
class E {
    constructor(arg: any) { }
}

class H extends E {
    constructor() {
        var x = super(5); // Should be of type void, not E.
        x = 5;
    }
}

//// [superCallAssignResult.js]
class E {
    constructor(arg) { }
}
class H extends E {
    constructor() {
        var x = super(5);
        x = 5;
    }
}
