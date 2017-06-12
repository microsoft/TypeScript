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
    var proto_1 = Test1.prototype;
    proto_1.initializeInternal = function () {
    };
    proto_1.test = function () {
        var x = new Test1();
        x.initializeInternal();
    };
    return Test1;
}());
var Test2 = (function () {
    function Test2() {
        this.p = 0;
    }
    var proto_2 = Test2.prototype;
    proto_2.test = function () {
        var x = new Test2();
        x.p;
    };
    return Test2;
}());
var Test3 = (function () {
    function Test3() {
    }
    var proto_3 = Test3.prototype;
    Object.defineProperty(proto_3, "x", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    proto_3.test = function () {
        var x = new Test3();
        x.x;
    };
    return Test3;
}());
var Test4 = (function () {
    function Test4() {
    }
    var proto_4 = Test4.prototype;
    Object.defineProperty(proto_4, "x", {
        set: function (v) {
            v;
        },
        enumerable: true,
        configurable: true
    });
    proto_4.test = function () {
        var x = new Test4();
        x.x;
    };
    return Test4;
}());
var Test5 = (function () {
    function Test5() {
    }
    var proto_5 = Test5.prototype;
    proto_5.test = function () {
        var x = new Test5();
        x.p;
    };
    return Test5;
}());
