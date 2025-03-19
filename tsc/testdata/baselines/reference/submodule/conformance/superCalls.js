//// [tests/cases/conformance/expressions/superCalls/superCalls.ts] ////

//// [superCalls.ts]
class Base {
    x = 43;
    constructor(n: string) {

    }
}

function v(): void { }

class Derived extends Base {
    //super call in class constructor of derived type
    constructor(public q: number) {
        super('');
        //type of super call expression is void
        var p = super('');
        var p = v();
    }
}

class OtherBase {

}

class OtherDerived extends OtherBase {
    constructor() {
        var p = '';
        super();
    }
}


//// [superCalls.js]
class Base {
    x = 43;
    constructor(n) {
    }
}
function v() { }
class Derived extends Base {
    q;
    //super call in class constructor of derived type
    constructor(q) {
        this.q = q;
        super('');
        //type of super call expression is void
        var p = super('');
        var p = v();
    }
}
class OtherBase {
}
class OtherDerived extends OtherBase {
    constructor() {
        var p = '';
        super();
    }
}
