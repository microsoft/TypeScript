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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
    __names(X.prototype, ["m", "mistake"]);
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
    Y.prototype.mistake = function () {
    };
    Y.prototype.m = function () {
    };
    __names(Y.prototype, ["mistake", "m"]);
    return Y;
}());
Y.prototype.mistake = true;
var y = new Y();
y.m();
y.mistake();
