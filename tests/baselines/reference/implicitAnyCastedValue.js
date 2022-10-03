//// [implicitAnyCastedValue.ts]
var x = function () {
    return <any>0;  // this should not be an error
}

function foo() {
    return <any>"hello world";  // this should not be an error
}

class C {
    bar = null;  // this should be an error
    foo = undefined;  // this should be an error
    public get tempVar() {
        return <any>0;  // this should not be an error
    }

    public returnBarWithCase() {    // this should not be an error
        return <any>this.bar;
    }

    public returnFooWithCase() {
        return <any>this.foo;  // this should not be an error
    }
}

class C1 {
    getValue = null;  // this should be an error

    public get castedGet() {
        return <any>this.getValue;  // this should not be an error
    }

    public get notCastedGet() {
        return this.getValue;  // this should not be an error
    }
}

function castedNull() {
    return <any>null;  // this should not be an error
}

function notCastedNull() {
    return null;  // this should be an error
}

function returnTypeBar(): any {
    return null;  // this should not be an error
}

function undefinedBar() {
    return <any>undefined;  // this should not be an error
}

function multipleRets1(x) {    // this should not be an error
    if (x) {
        return <any>0;
    }
    else {
        return null;
    }
}

function multipleRets2(x) {    // this should not be an error
    if (x) {
        return null;
    }
    else if (x == 1) {
        return <any>0;
    }
    else {
        return undefined;
    }
}

// this should not be an error
var bar1 = <any>null;
var bar2 = <any>undefined;
var bar3 = <any>0;
var array = <any>[null, undefined];

//// [implicitAnyCastedValue.js]
var x = function () {
    return 0; // this should not be an error
};
function foo() {
    return "hello world"; // this should not be an error
}
var C = /** @class */ (function () {
    function C() {
        this.bar = null; // this should be an error
        this.foo = undefined; // this should be an error
    }
    Object.defineProperty(C.prototype, "tempVar", {
        get: function () {
            return 0; // this should not be an error
        },
        enumerable: false,
        configurable: true
    });
    C.prototype.returnBarWithCase = function () {
        return this.bar;
    };
    C.prototype.returnFooWithCase = function () {
        return this.foo; // this should not be an error
    };
    return C;
}());
var C1 = /** @class */ (function () {
    function C1() {
        this.getValue = null; // this should be an error
    }
    Object.defineProperty(C1.prototype, "castedGet", {
        get: function () {
            return this.getValue; // this should not be an error
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C1.prototype, "notCastedGet", {
        get: function () {
            return this.getValue; // this should not be an error
        },
        enumerable: false,
        configurable: true
    });
    return C1;
}());
function castedNull() {
    return null; // this should not be an error
}
function notCastedNull() {
    return null; // this should be an error
}
function returnTypeBar() {
    return null; // this should not be an error
}
function undefinedBar() {
    return undefined; // this should not be an error
}
function multipleRets1(x) {
    if (x) {
        return 0;
    }
    else {
        return null;
    }
}
function multipleRets2(x) {
    if (x) {
        return null;
    }
    else if (x == 1) {
        return 0;
    }
    else {
        return undefined;
    }
}
// this should not be an error
var bar1 = null;
var bar2 = undefined;
var bar3 = 0;
var array = [null, undefined];
