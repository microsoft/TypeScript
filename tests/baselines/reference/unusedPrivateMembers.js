//// [tests/cases/compiler/unusedPrivateMembers.ts] ////

//// [unusedPrivateMembers.ts]
class Test1 {
    private initializeInternal() {
    }

    public test() {
        var x = new Test1();
        x.initializeInternal();
    }
}

class Test2 {
    private p = 0;
    public test() {
        var x = new Test2();
        x.p;
    }
}

class Test3 {
    private get x () {
        return 0;
    }

    public test() {
        var x = new Test3();
        x.x;
    }
}

class Test4 {
    private set x(v) {
        v;
    }

    public test() {
        var x = new Test4();
        x.x;
    }
}

class Test5<T> {
    private p: T;
    public test() {
        var x = new Test5<number>();
        x.p;
    }
}

class Test6 {
    private get a() {
        return 0;
    }
    private set a(v) {
        v;
    }
    private b = 0;

    public test() {
        var x = new Test6();
        x.a++;
    }
}


//// [unusedPrivateMembers.js]
class Test1 {
    initializeInternal() {
    }
    test() {
        var x = new Test1();
        x.initializeInternal();
    }
}
class Test2 {
    constructor() {
        this.p = 0;
    }
    test() {
        var x = new Test2();
        x.p;
    }
}
class Test3 {
    get x() {
        return 0;
    }
    test() {
        var x = new Test3();
        x.x;
    }
}
class Test4 {
    set x(v) {
        v;
    }
    test() {
        var x = new Test4();
        x.x;
    }
}
class Test5 {
    test() {
        var x = new Test5();
        x.p;
    }
}
class Test6 {
    constructor() {
        this.b = 0;
    }
    get a() {
        return 0;
    }
    set a(v) {
        v;
    }
    test() {
        var x = new Test6();
        x.a++;
    }
}
