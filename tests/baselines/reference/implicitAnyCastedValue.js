//// [implicitAnyCastedValue.js]
var x = function () {
    return 0;
};

function foo() {
    return "hello world";
}

var C = (function () {
    function C() {
        this.bar = null;
        this.foo = undefined;
    }
    Object.defineProperty(C.prototype, "tempVar", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });

    C.prototype.returnBarWithCase = function () {
        return this.bar;
    };

    C.prototype.returnFooWithCase = function () {
        return this.foo;
    };
    return C;
})();

var C1 = (function () {
    function C1() {
        this.getValue = null;
    }
    Object.defineProperty(C1.prototype, "castedGet", {
        get: function () {
            return this.getValue;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(C1.prototype, "notCastedGet", {
        get: function () {
            return this.getValue;
        },
        enumerable: true,
        configurable: true
    });
    return C1;
})();

function castedNull() {
    return null;
}

function notCastedNull() {
    return null;
}

function returnTypeBar() {
    return null;
}

function undefinedBar() {
    return undefined;
}

function multipleRets1(x) {
    if (x) {
        return 0;
    } else {
        return null;
    }
}

function multipleRets2(x) {
    if (x) {
        return null;
    } else if (x == 1) {
        return 0;
    } else {
        return undefined;
    }
}

// this should not be an error
var bar1 = null;
var bar2 = undefined;
var bar3 = 0;
var array = [null, undefined];
