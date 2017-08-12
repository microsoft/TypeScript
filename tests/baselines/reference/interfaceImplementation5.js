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
var C1 = (function () {
    function C1() {
    }
    var proto_1 = C1.prototype;
    Object.defineProperty(proto_1, "getset1", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return C1;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    Object.defineProperty(proto_2, "getset1", {
        set: function (baz) { },
        enumerable: true,
        configurable: true
    });
    return C2;
}());
var C3 = (function () {
    function C3() {
    }
    var proto_3 = C3.prototype;
    Object.defineProperty(proto_3, "getset1", {
        get: function () { return 1; },
        set: function (baz) { },
        enumerable: true,
        configurable: true
    });
    return C3;
}());
var C4 = (function () {
    function C4() {
    }
    var proto_4 = C4.prototype;
    Object.defineProperty(proto_4, "getset1", {
        get: function () { var x; return x; },
        enumerable: true,
        configurable: true
    });
    return C4;
}());
var C5 = (function () {
    function C5() {
    }
    var proto_5 = C5.prototype;
    Object.defineProperty(proto_5, "getset1", {
        set: function (baz) { },
        enumerable: true,
        configurable: true
    });
    return C5;
}());
var C6 = (function () {
    function C6() {
    }
    var proto_6 = C6.prototype;
    Object.defineProperty(proto_6, "getset1", {
        get: function () { var x; return x; },
        set: function (baz) { },
        enumerable: true,
        configurable: true
    });
    return C6;
}());
