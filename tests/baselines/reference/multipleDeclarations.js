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
var X = (function () {
    function X() {
        this.m = this.m.bind(this);
        this.mistake = 'frankly, complete nonsense';
    }
    var proto_1 = X.prototype;
    proto_1.m = function () {
    };
    proto_1.mistake = function () {
    };
    return X;
}());
var x = new X();
X.prototype.mistake = false;
x.m();
x.mistake;
var Y = (function () {
    function Y() {
        this.m = this.m.bind(this);
        this.mistake = 'even more nonsense';
    }
    var proto_2 = Y.prototype;
    proto_2.mistake = function () {
    };
    proto_2.m = function () {
    };
    return Y;
}());
Y.prototype.mistake = true;
var y = new Y();
y.m();
y.mistake();
