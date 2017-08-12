//// [getAndSetAsMemberNames.ts]
class C1 {
    set: boolean;
    get = 1;
}
class C2 {
    set;
}
class C3 {
    set (x) {
        return x + 1;
    }
}
class C4 {
    get: boolean = true;
}
class C5 {
    public set: () => boolean = function () { return true; };
    get (): boolean { return true; }
    set t(x) { }
}


//// [getAndSetAsMemberNames.js]
var C1 = (function () {
    function C1() {
        this.get = 1;
    }
    return C1;
}());
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
var C3 = (function () {
    function C3() {
    }
    var proto_1 = C3.prototype;
    proto_1.set = function (x) {
        return x + 1;
    };
    return C3;
}());
var C4 = (function () {
    function C4() {
        this.get = true;
    }
    return C4;
}());
var C5 = (function () {
    function C5() {
        this.set = function () { return true; };
    }
    var proto_2 = C5.prototype;
    proto_2.get = function () { return true; };
    Object.defineProperty(proto_2, "t", {
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    return C5;
}());
