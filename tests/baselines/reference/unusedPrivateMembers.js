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
var Test1 = /** @class */ (function () {
    function Test1() {
    }
    Test1.prototype.initializeInternal = function () {
    };
    Test1.prototype.test = function () {
        var x = new Test1();
        x.initializeInternal();
    };
    return Test1;
}());
var Test2 = /** @class */ (function () {
    function Test2() {
        this.p = 0;
    }
    Test2.prototype.test = function () {
        var x = new Test2();
        x.p;
    };
    return Test2;
}());
var Test3 = /** @class */ (function () {
    function Test3() {
    }
    Object.defineProperty(Test3.prototype, "x", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Test3.prototype.test = function () {
        var x = new Test3();
        x.x;
    };
    return Test3;
}());
var Test4 = /** @class */ (function () {
    function Test4() {
    }
    Object.defineProperty(Test4.prototype, "x", {
        set: function (v) {
            v;
        },
        enumerable: false,
        configurable: true
    });
    Test4.prototype.test = function () {
        var x = new Test4();
        x.x;
    };
    return Test4;
}());
var Test5 = /** @class */ (function () {
    function Test5() {
    }
    Test5.prototype.test = function () {
        var x = new Test5();
        x.p;
    };
    return Test5;
}());
var Test6 = /** @class */ (function () {
    function Test6() {
        this.b = 0;
    }
    Object.defineProperty(Test6.prototype, "a", {
        get: function () {
            return 0;
        },
        set: function (v) {
            v;
        },
        enumerable: false,
        configurable: true
    });
    Test6.prototype.test = function () {
        var x = new Test6();
        x.a++;
    };
    return Test6;
}());
