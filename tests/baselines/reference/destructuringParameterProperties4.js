//// [destructuringParameterProperties4.ts]

class C1<T, U, V> {
    constructor(private k: T, protected [a, b, c]: [T,U,V]) {
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }

    public getA() {
        return this.a
    }

    public getB() {
        return this.b
    }

    public getC() {
        return this.c;
    }
}

class C2 extends C1<number, string, boolean> {
    public doSomethingWithSuperProperties() {
        return `${this.a} ${this.b} ${this.c}`;
    }
}


//// [destructuringParameterProperties4.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C1 = (function () {
    function C1(k, [a, b, c]) {
        this.k = k;
        this.a = a;
        this.b = b;
        this.c = c;
        if ((b === undefined && c === undefined) || (this.b === undefined && this.c === undefined)) {
            this.a = a || k;
        }
    }
    C1.prototype.getA = function () {
        return this.a;
    };
    C1.prototype.getB = function () {
        return this.b;
    };
    C1.prototype.getC = function () {
        return this.c;
    };
    return C1;
})();
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    C2.prototype.doSomethingWithSuperProperties = function () {
        return `${this.a} ${this.b} ${this.c}`;
    };
    return C2;
})(C1);
