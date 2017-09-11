//// [varArgConstructorMemberParameter.ts]
class Foo1 {
    constructor (...args: string[]) { }
}

class Foo2 {
    constructor (public args: string[]) { }
}

class Foo3 {
    constructor (public ...args: string[]) { }
}


//// [varArgConstructorMemberParameter.js]
var Foo1 = /** @class */ (function () {
    function Foo1() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Foo1;
}());
var Foo2 = /** @class */ (function () {
    function Foo2(args) {
        this.args = args;
    }
    return Foo2;
}());
var Foo3 = /** @class */ (function () {
    function Foo3() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.args = args;
    }
    return Foo3;
}());
