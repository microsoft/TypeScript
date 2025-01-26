//// [tests/cases/compiler/falsinessCallExpressionCoercion.ts] ////

//// [falsinessCallExpressionCoercion.ts]
function test1() {
    function canAccess() { return false; }

    if (!canAccess) { // error
    }
}

function test2() {
    function canAccess() { return false; }

    if (!canAccess) { // ok
    }

    canAccess();
}

function test3() {
    function canAccess() { return false; }

    if (!!!canAccess) { // ok
    }
}

function test4(canAccess: () => boolean) {
    if (!canAccess) { // error
    }
}

function test5(canAccess?: () => boolean) {
    if (!canAccess) { // ok
    }
}

function test6() {
    const x = {
        foo: {
            bar() { return true; }
        }
    };

    if (!x.foo.bar) { // error
    }
}

function test7() {
    const x = {
        foo: {
            bar() { return true; }
        }
    };

    if (!x.foo.bar) { // ok
    }

    x.foo.bar();
}

class Test8 {
    maybeIsUser?: () => boolean;

    isUser() {
        return true;
    }

    test() {
        if (!this.isUser) { // error
        }

        if (!this.maybeIsUser) { // ok
        }
    }
}

class Test9 {
    isUser() {
        return true;
    }

    test() {
        if (!this.isUser) { // ok
        }

        this.isUser();
    }
}

function test10() {
    function canAccess() { return false; }

    const res = canAccess
    if (!res) { // error
    }
}

function test11() {
    function canAccess() { return false; }

    if (!canAccess) { // ok
    } else {
        canAccess()
    }
}

function test12() {
    function canAccess() { return false; }

    if (!canAccess || Math.random()) { // error
    }
}

function test13() {
    function canAccess() { return false; }

    if (!canAccess || Math.random()) { // ok
    }

    canAccess()
}


//// [falsinessCallExpressionCoercion.js]
function test1() {
    function canAccess() { return false; }
    if (!canAccess) { // error
    }
}
function test2() {
    function canAccess() { return false; }
    if (!canAccess) { // ok
    }
    canAccess();
}
function test3() {
    function canAccess() { return false; }
    if (!!!canAccess) { // ok
    }
}
function test4(canAccess) {
    if (!canAccess) { // error
    }
}
function test5(canAccess) {
    if (!canAccess) { // ok
    }
}
function test6() {
    var x = {
        foo: {
            bar: function () { return true; }
        }
    };
    if (!x.foo.bar) { // error
    }
}
function test7() {
    var x = {
        foo: {
            bar: function () { return true; }
        }
    };
    if (!x.foo.bar) { // ok
    }
    x.foo.bar();
}
var Test8 = /** @class */ (function () {
    function Test8() {
    }
    Test8.prototype.isUser = function () {
        return true;
    };
    Test8.prototype.test = function () {
        if (!this.isUser) { // error
        }
        if (!this.maybeIsUser) { // ok
        }
    };
    return Test8;
}());
var Test9 = /** @class */ (function () {
    function Test9() {
    }
    Test9.prototype.isUser = function () {
        return true;
    };
    Test9.prototype.test = function () {
        if (!this.isUser) { // ok
        }
        this.isUser();
    };
    return Test9;
}());
function test10() {
    function canAccess() { return false; }
    var res = canAccess;
    if (!res) { // error
    }
}
function test11() {
    function canAccess() { return false; }
    if (!canAccess) { // ok
    }
    else {
        canAccess();
    }
}
function test12() {
    function canAccess() { return false; }
    if (!canAccess || Math.random()) { // error
    }
}
function test13() {
    function canAccess() { return false; }
    if (!canAccess || Math.random()) { // ok
    }
    canAccess();
}
