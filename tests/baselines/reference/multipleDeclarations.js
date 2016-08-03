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
    X.prototype.m = function () {
    };
    X.prototype.mistake = function () {
    };
    return X;
}());
var x = new X();
X.prototype.mistake = false;
x.m();
x.mistake;
