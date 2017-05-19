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


//// [unusedPrivateMembers.js]
var Test1 = (function () {
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
var Test2 = (function () {
    function Test2() {
        this.p = 0;
    }
    Test2.prototype.test = function () {
        var x = new Test2();
        x.p;
    };
    return Test2;
}());
var Test3 = (function () {
    function Test3() {
    }
    Object.defineProperty(Test3.prototype, "x", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Test3.prototype.test = function () {
        var x = new Test3();
        x.x;
    };
    return Test3;
}());
var Test4 = (function () {
    function Test4() {
    }
    Object.defineProperty(Test4.prototype, "x", {
        set: function (v) {
            v;
        },
        enumerable: true,
        configurable: true
    });
    Test4.prototype.test = function () {
        var x = new Test4();
        x.x;
    };
    return Test4;
}());
var Test5 = (function () {
    function Test5() {
    }
    Test5.prototype.test = function () {
        var x = new Test5();
        x.p;
    };
    return Test5;
}());
