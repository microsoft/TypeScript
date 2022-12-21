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
var C1 = /** @class */ (function () {
    function C1() {
        this.get = 1;
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    C3.prototype.set = function (x) {
        return x + 1;
    };
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
        this.get = true;
    }
    return C4;
}());
var C5 = /** @class */ (function () {
    function C5() {
        this.set = function () { return true; };
    }
    C5.prototype.get = function () { return true; };
    Object.defineProperty(C5.prototype, "t", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C5;
}());
