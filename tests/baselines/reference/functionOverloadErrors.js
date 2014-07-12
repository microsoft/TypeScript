//// [functionOverloadErrors.js]
function fn1() {
}


function fn2a() {
}

function fn2b() {
}


function fn3() {
    return null;
}


function fn6() {
}


function fn7() {
}


function fn8() {
}


function fn9() {
}


function fn10() {
}


function fn11() {
}


function fn12() {
}

//Function overloads that differ by accessibility
var cls = (function () {
    function cls() {
    }
    cls.prototype.f = function () {
    };

    cls.prototype.g = function () {
    };
    return cls;
})();

//Function overloads with differing export
var M;
(function (M) {
    function fn1() {
    }

    function fn2() {
    }
    M.fn2 = fn2;
})(M || (M = {}));


function dfn1() {
}

function dfn2() {
}

function fewerParams(n) {
}

function fn13(n) {
}

function fn14() {
    return 3;
}


function fn15() {
    return undefined;
}

function initExpr() {
}
