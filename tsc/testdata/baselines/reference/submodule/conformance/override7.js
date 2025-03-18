//// [tests/cases/conformance/override/override7.ts] ////

//// [override7.ts]
class B {
    p1: number = 1;
    p2: number = 2;
    p3: number = 3;
    p4: number = 4;
}

class D extends B{
    declare p1: number

    override declare p2: number;

    readonly override p3: number;

    override readonly p4: number;

    static override sp: number;

    override override oop: number;

    public override pp: number;
    override public op: number;

    override constructor () {
        super();
    }
}


abstract class AB {
    abstract f (): void;
    abstract b (): void;
}

abstract class AD extends AB {
    override abstract f(): void;
    abstract override b(): void;
}

abstract class AND {
    override abstract f(): void;
    abstract override b(): void;
}

class ADD extends AD {
    override f(): void {

    }
    override b(): void {

    }
}


//// [override7.js]
class B {
    p1 = 1;
    p2 = 2;
    p3 = 3;
    p4 = 4;
}
class D extends B {
    p3;
    p4;
    static sp;
    oop;
    pp;
    op;
    constructor() {
        super();
    }
}
class AB {
}
class AD extends AB {
}
class AND {
}
class ADD extends AD {
    f() {
    }
    b() {
    }
}
