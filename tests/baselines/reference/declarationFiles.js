//// [declarationFiles.ts]
class C1 {
    x: this;
    f(x: this): this { return undefined; }
    constructor(x: this) { }
}

class C2 {
    [x: string]: this;
}

interface Foo<T> {
    x: T;
    y: this;
}

class C3 {
    a: this[];
    b: [this, this];
    c: this | Date;
    d: this & Date;
    e: (((this)));
    f: (x: this) => this;
    g: new (x: this) => this;
    h: Foo<this>;
    i: Foo<this | (() => this)>;
    j: (x: any) => x is this;
}

class C4 {
    x1 = { a: this };
    x2 = [this];
    x3 = [{ a: this }];
    x4 = () => this;
    f1() {
        return { a: this };
    }
    f2() {
        return [this];
    }
    f3() {
        return [{ a: this }];
    }
    f4() {
        return () => this;
    }
}


//// [declarationFiles.js]
var C1 = /** @class */ (function () {
    function C1(x) {
    }
    C1.prototype.f = function (x) { return undefined; };
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
    return C3;
}());
var C4 = /** @class */ (function () {
    function C4() {
        var _this = this;
        this.x1 = { a: this };
        this.x2 = [this];
        this.x3 = [{ a: this }];
        this.x4 = function () { return _this; };
    }
    C4.prototype.f1 = function () {
        return { a: this };
    };
    C4.prototype.f2 = function () {
        return [this];
    };
    C4.prototype.f3 = function () {
        return [{ a: this }];
    };
    C4.prototype.f4 = function () {
        var _this = this;
        return function () { return _this; };
    };
    return C4;
}());
