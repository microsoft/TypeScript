//// [tests/cases/compiler/interfaceImplementation5.ts] ////

//// [interfaceImplementation5.ts]
interface I1 {
    getset1:number;
}

class C1 implements I1 {
    public get getset1(){return 1;}
}

class C2 implements I1 {
    public set getset1(baz:number){}
}

class C3 implements I1 {
    public get getset1(){return 1;}
    public set getset1(baz:number){}
}

class C4 implements I1 {
    public get getset1(){var x:any; return x;}
}

class C5 implements I1 {
    public set getset1(baz:any){}
}

class C6 implements I1 {
    public set getset1(baz:any){}
    public get getset1(){var x:any; return x;}
}



//// [interfaceImplementation5.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    Object.defineProperty(C1.prototype, "getset1", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    Object.defineProperty(C2.prototype, "getset1", {
        set: function (baz) { },
        enumerable: false,
        configurable: true
    });
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    Object.defineProperty(C3.prototype, "getset1", {
        get: function () { return 1; },
        set: function (baz) { },
        enumerable: false,
        configurable: true
    });
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
    }
    Object.defineProperty(C4.prototype, "getset1", {
        get: function () { var x; return x; },
        enumerable: false,
        configurable: true
    });
    return C4;
}());
var C5 = /** @class */ (function () {
    function C5() {
    }
    Object.defineProperty(C5.prototype, "getset1", {
        set: function (baz) { },
        enumerable: false,
        configurable: true
    });
    return C5;
}());
var C6 = /** @class */ (function () {
    function C6() {
    }
    Object.defineProperty(C6.prototype, "getset1", {
        get: function () { var x; return x; },
        set: function (baz) { },
        enumerable: false,
        configurable: true
    });
    return C6;
}());
