//// [typeOfThis.ts]
class MyTestClass {
    private canary: number;
    static staticCanary: number;

    constructor() {
        //type of 'this' in constructor body is the class instance type
        var p = this.canary;
        var p: number;
        this.canary = 3;
    }

    //type of 'this' in member function param list is the class instance type
    memberFunc(t = this) {
        var t: MyTestClass;

        //type of 'this' in member function body is the class instance type
        var p = this;
        var p: MyTestClass;
    }

    //type of 'this' in member accessor(get and set) body is the class instance type
    get prop() {
        var p = this;
        var p: MyTestClass;
        return this;
    }
    set prop(v) {
        var p = this;
        var p: MyTestClass;
        p = v;
        v = p;
    }

    someFunc = () => {
        //type of 'this' in member variable initializer is the class instance type
        var t = this;
        var t: MyTestClass;
    };

    //type of 'this' in static function param list is constructor function type
    static staticFn(t = this) {
        var t: typeof MyTestClass;
        var t = MyTestClass;
        t.staticCanary;

        //type of 'this' in static function body is constructor function type
        var p = this;
        var p: typeof MyTestClass;
        var p = MyTestClass;
        p.staticCanary;
    }

    static get staticProp() {
        //type of 'this' in static accessor body is constructor function type
        var p = this;
        var p: typeof MyTestClass;
        var p = MyTestClass;
        p.staticCanary;
        return this;
    }
    static set staticProp(v: typeof MyTestClass) {
        //type of 'this' in static accessor body is constructor function type
        var p = this;
        var p: typeof MyTestClass;
        var p = MyTestClass;
        p.staticCanary;
    }
}

class MyGenericTestClass<T, U> {
    private canary: number;
    static staticCanary: number;

    constructor() {
        //type of 'this' in constructor body is the class instance type
        var p = this.canary;
        var p: number;
        this.canary = 3;
    }

    //type of 'this' in member function param list is the class instance type
    memberFunc(t = this) {
        var t: MyGenericTestClass<T, U>;

        //type of 'this' in member function body is the class instance type
        var p = this;
        var p: MyGenericTestClass<T, U>;
    }

    //type of 'this' in member accessor(get and set) body is the class instance type
    get prop() {
        var p = this;
        var p: MyGenericTestClass<T, U>;
        return this;
    }
    set prop(v) {
        var p = this;
        var p: MyGenericTestClass<T, U>;
        p = v;
        v = p;
    }

    someFunc = () => {
        //type of 'this' in member variable initializer is the class instance type
        var t = this;
        var t: MyGenericTestClass<T, U>;
    };

    //type of 'this' in static function param list is constructor function type
    static staticFn(t = this) {
        var t: typeof MyGenericTestClass;
        var t = MyGenericTestClass;
        t.staticCanary;

        //type of 'this' in static function body is constructor function type
        var p = this;
        var p: typeof MyGenericTestClass;
        var p = MyGenericTestClass;
        p.staticCanary;
    }

    static get staticProp() {
        //type of 'this' in static accessor body is constructor function type
        var p = this;
        var p: typeof MyGenericTestClass;
        var p = MyGenericTestClass;
        p.staticCanary;
        return this;
    }
    static set staticProp(v: typeof MyGenericTestClass) {
        //type of 'this' in static accessor body is constructor function type
        var p = this;
        var p: typeof MyGenericTestClass;
        var p = MyGenericTestClass;
        p.staticCanary;
    }
}

//type of 'this' in a function declaration param list is Any
function fn(s = this) {
    var s: any;
    s.spaaaaaaace = 4;

    //type of 'this' in a function declaration body is Any
    var t: any;
    var t = this;
    this.spaaaaace = 4;
}

//type of 'this' in a function expression param list list is Any
var q1 = function (s = this) {
    var s: any;
    s.spaaaaaaace = 4;

    //type of 'this' in a function expression body is Any
    var t: any;
    var t = this;
    this.spaaaaace = 4;
}

//type of 'this' in a fat arrow expression param list is Any
var q2 = (s = this) => {
    var s: any;
    s.spaaaaaaace = 4;

    //type of 'this' in a fat arrow expression body is Any
    var t: any;
    var t = this;
    this.spaaaaace = 4;
}

//type of 'this' in global module is Any
var t: any;
var t = this;
this.spaaaaace = 4;



//// [typeOfThis.js]
var _this = this;
var MyTestClass = (function () {
    function MyTestClass() {
        var _this = this;
        this.someFunc = function () {
            //type of 'this' in member variable initializer is the class instance type
            var t = _this;
            var t;
        };
        //type of 'this' in constructor body is the class instance type
        var p = this.canary;
        var p;
        this.canary = 3;
    }
    //type of 'this' in member function param list is the class instance type
    MyTestClass.prototype.memberFunc = function (t) {
        if (t === void 0) { t = this; }
        var t;
        //type of 'this' in member function body is the class instance type
        var p = this;
        var p;
    };
    Object.defineProperty(MyTestClass.prototype, "prop", {
        //type of 'this' in member accessor(get and set) body is the class instance type
        get: function () {
            var p = this;
            var p;
            return this;
        },
        set: function (v) {
            var p = this;
            var p;
            p = v;
            v = p;
        },
        enumerable: true,
        configurable: true
    });
    //type of 'this' in static function param list is constructor function type
    MyTestClass.staticFn = function (t) {
        if (t === void 0) { t = this; }
        var t;
        var t = MyTestClass;
        t.staticCanary;
        //type of 'this' in static function body is constructor function type
        var p = this;
        var p;
        var p = MyTestClass;
        p.staticCanary;
    };
    Object.defineProperty(MyTestClass, "staticProp", {
        get: function () {
            //type of 'this' in static accessor body is constructor function type
            var p = this;
            var p;
            var p = MyTestClass;
            p.staticCanary;
            return this;
        },
        set: function (v) {
            //type of 'this' in static accessor body is constructor function type
            var p = this;
            var p;
            var p = MyTestClass;
            p.staticCanary;
        },
        enumerable: true,
        configurable: true
    });
    return MyTestClass;
}());
var MyGenericTestClass = (function () {
    function MyGenericTestClass() {
        var _this = this;
        this.someFunc = function () {
            //type of 'this' in member variable initializer is the class instance type
            var t = _this;
            var t;
        };
        //type of 'this' in constructor body is the class instance type
        var p = this.canary;
        var p;
        this.canary = 3;
    }
    //type of 'this' in member function param list is the class instance type
    MyGenericTestClass.prototype.memberFunc = function (t) {
        if (t === void 0) { t = this; }
        var t;
        //type of 'this' in member function body is the class instance type
        var p = this;
        var p;
    };
    Object.defineProperty(MyGenericTestClass.prototype, "prop", {
        //type of 'this' in member accessor(get and set) body is the class instance type
        get: function () {
            var p = this;
            var p;
            return this;
        },
        set: function (v) {
            var p = this;
            var p;
            p = v;
            v = p;
        },
        enumerable: true,
        configurable: true
    });
    //type of 'this' in static function param list is constructor function type
    MyGenericTestClass.staticFn = function (t) {
        if (t === void 0) { t = this; }
        var t;
        var t = MyGenericTestClass;
        t.staticCanary;
        //type of 'this' in static function body is constructor function type
        var p = this;
        var p;
        var p = MyGenericTestClass;
        p.staticCanary;
    };
    Object.defineProperty(MyGenericTestClass, "staticProp", {
        get: function () {
            //type of 'this' in static accessor body is constructor function type
            var p = this;
            var p;
            var p = MyGenericTestClass;
            p.staticCanary;
            return this;
        },
        set: function (v) {
            //type of 'this' in static accessor body is constructor function type
            var p = this;
            var p;
            var p = MyGenericTestClass;
            p.staticCanary;
        },
        enumerable: true,
        configurable: true
    });
    return MyGenericTestClass;
}());
//type of 'this' in a function declaration param list is Any
function fn(s) {
    if (s === void 0) { s = this; }
    var s;
    s.spaaaaaaace = 4;
    //type of 'this' in a function declaration body is Any
    var t;
    var t = this;
    this.spaaaaace = 4;
}
//type of 'this' in a function expression param list list is Any
var q1 = function (s) {
    if (s === void 0) { s = this; }
    var s;
    s.spaaaaaaace = 4;
    //type of 'this' in a function expression body is Any
    var t;
    var t = this;
    this.spaaaaace = 4;
};
//type of 'this' in a fat arrow expression param list is Any
var q2 = function (s) {
    if (s === void 0) { s = _this; }
    var s;
    s.spaaaaaaace = 4;
    //type of 'this' in a fat arrow expression body is Any
    var t;
    var t = _this;
    _this.spaaaaace = 4;
};
//type of 'this' in global module is Any
var t;
var t = this;
this.spaaaaace = 4;
