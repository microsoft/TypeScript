//// [input.js]
function C() {
    this.m = null;
}
C.prototype.m = function() {
    this.nothing();
}
class X {
    constructor() {
        this.m = this.m.bind(this);
        this.mistake = 'frankly, complete nonsense';
    }
    m() {
    }
    mistake() {
    }
}
let x = new X();
X.prototype.mistake = false;
x.m();
x.mistake;
class Y {
    mistake() {
    }
    m() {
    }
    constructor() {
        this.m = this.m.bind(this);
        this.mistake = 'even more nonsense';
    }
}
Y.prototype.mistake = true;
let y = new Y();
y.m();
y.mistake();


//// [output.js]
function C() {
    this.m = null;
}
C.prototype.m = function () {
    this.nothing();
};
var X = /** @class */ (function () {
    function X() {
        this.m = this.m.bind(this);
        this.mistake = 'frankly, complete nonsense';
    }
    var X_prototype = X.prototype;
    X_prototype.m = function () {
    };
    X_prototype.mistake = function () {
    };
    return X;
}());
var x = new X();
X.prototype.mistake = false;
x.m();
x.mistake;
var Y = /** @class */ (function () {
    function Y() {
        this.m = this.m.bind(this);
        this.mistake = 'even more nonsense';
    }
    var Y_prototype = Y.prototype;
    Y_prototype.mistake = function () {
    };
    Y_prototype.m = function () {
    };
    return Y;
}());
Y.prototype.mistake = true;
var y = new Y();
y.m();
y.mistake();
