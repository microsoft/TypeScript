//// [tests/cases/compiler/collisionThisExpressionAndPropertyNameAsConstuctorParameter.ts] ////

//// [collisionThisExpressionAndPropertyNameAsConstuctorParameter.ts]
class Foo2 {
    constructor(_this: number) { //Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}

class Foo3 {
    constructor(private _this: number) { // Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}   

class Foo4 {
    constructor(_this: number); // No code gen - no error
    constructor(_this: string); // No code gen - no error
    constructor(_this: any) { // Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}  

class Foo5 {
    constructor(_this: number); // No code gen - no error
    constructor(_this: string); // No code gen - no error
    constructor(private _this: any) { // Error
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}  

//// [collisionThisExpressionAndPropertyNameAsConstuctorParameter.js]
var Foo2 = /** @class */ (function () {
    function Foo2(_this) {
        var _this_1 = this;
        var lambda = function () {
            return function (x) { return _this_1; }; // New scope.  So should inject new _this capture
        };
    }
    return Foo2;
}());
var Foo3 = /** @class */ (function () {
    function Foo3(_this) {
        var _this_1 = this;
        this._this = _this;
        var lambda = function () {
            return function (x) { return _this_1; }; // New scope.  So should inject new _this capture
        };
    }
    return Foo3;
}());
var Foo4 = /** @class */ (function () {
    function Foo4(_this) {
        var _this_1 = this;
        var lambda = function () {
            return function (x) { return _this_1; }; // New scope.  So should inject new _this capture
        };
    }
    return Foo4;
}());
var Foo5 = /** @class */ (function () {
    function Foo5(_this) {
        var _this_1 = this;
        this._this = _this;
        var lambda = function () {
            return function (x) { return _this_1; }; // New scope.  So should inject new _this capture
        };
    }
    return Foo5;
}());
