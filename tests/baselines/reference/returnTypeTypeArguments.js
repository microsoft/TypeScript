//// [returnTypeTypeArguments.js]
// bug 754858: TypeParameters not required for return types
var One = (function () {
    function One() {
    }
    return One;
})();
var Two = (function () {
    function Two() {
    }
    return Two;
})();
var Three = (function () {
    function Three() {
    }
    return Three;
})();

function A1() {
    return null;
}
function A2() {
    return null;
}
function A3() {
    return null;
}

function B1() {
    return null;
}
function B2() {
    return null;
}
function B3() {
    return null;
}

var C = (function () {
    function C() {
    }
    C.prototype.A1 = function () {
        return null;
    };
    C.prototype.A2 = function () {
        return null;
    };
    C.prototype.A3 = function () {
        return null;
    };

    C.prototype.B1 = function () {
        return null;
    };
    C.prototype.B2 = function () {
        return null;
    };
    C.prototype.B3 = function () {
        return null;
    };
    return C;
})();

var D = (function () {
    function D() {
    }
    D.prototype.A2 = function () {
        return null;
    };
    D.prototype.A3 = function () {
        return null;
    };

    D.prototype.B1 = function () {
        return null;
    };
    D.prototype.B2 = function () {
        return null;
    };
    D.prototype.B3 = function () {
        return null;
    };
    return D;
})();

var Y = (function () {
    function Y() {
    }
    return Y;
})();

var X = (function () {
    function X() {
    }
    return X;
})();
