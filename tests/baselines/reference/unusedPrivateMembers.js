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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Test1 = (function () {
    function Test1() {
    }
    Test1.prototype.initializeInternal = function () {
    };
    Test1.prototype.test = function () {
        var x = new Test1();
        x.initializeInternal();
    };
    __names(Test1.prototype, ["initializeInternal", "test"]);
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
    __names(Test2.prototype, ["test"]);
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
    __names(Test3.prototype, ["test"]);
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
    __names(Test4.prototype, ["test"]);
    return Test4;
}());
var Test5 = (function () {
    function Test5() {
    }
    Test5.prototype.test = function () {
        var x = new Test5();
        x.p;
    };
    __names(Test5.prototype, ["test"]);
    return Test5;
}());
