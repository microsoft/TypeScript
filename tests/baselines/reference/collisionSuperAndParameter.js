//// [collisionSuperAndParameter.ts]
class Foo {
    a() {
        var lamda = (_super: number) => { // No Error 
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    b(_super: number) { // No Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    set c(_super: number) { // No error
    }
}
class Foo2 extends Foo {
    x() {
        var lamda = (_super: number) => { // Error 
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    y(_super: number) { // Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
    set z(_super: number) { // Error
    }
    public prop3: {
        doStuff: (_super: number) => void; // no error - no code gen
    }
    public prop4 = {
        doStuff: (_super: number) => { // should be error
        }
    }
    constructor(_super: number) { // should be error
        super();
    }
}
declare class Foo3 extends Foo {
    x();
    y(_super: number); // No error - no code gen
    constructor(_super: number); // No error - no code gen
    public prop2: {
        doStuff: (_super: number) => void; // no error - no code gen
    };
    public _super: number; // No error
}

class Foo4 extends Foo {
    constructor(_super: number); // no code gen - no error
    constructor(_super: string);// no code gen - no error
    constructor(_super: any) { // should be error
        super();
    }
    y(_super: number); // no code gen - no error
    y(_super: string); // no code gen - no error
    y(_super: any) { // Error 
        var lambda = () => {
            return x => this;   // New scope.  So should inject new _this capture
        }
    }
}

//// [collisionSuperAndParameter.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.a = function () {
        var _this = this;
        var lamda = function (_super) {
            return function (x) { return _this; }; // New scope.  So should inject new _this capture
        };
    };
    proto_1.b = function (_super) {
        var _this = this;
        var lambda = function () {
            return function (x) { return _this; }; // New scope.  So should inject new _this capture
        };
    };
    Object.defineProperty(proto_1, "c", {
        set: function (_super) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
var Foo2 = (function (_super) {
    __extends(Foo2, _super);
    function Foo2(_super) {
        var _this = _super.call(this) || this;
        _this.prop4 = {
            doStuff: function (_super) {
            }
        };
        return _this;
    }
    var proto_2 = Foo2.prototype;
    proto_2.x = function () {
        var _this = this;
        var lamda = function (_super) {
            return function (x) { return _this; }; // New scope.  So should inject new _this capture
        };
    };
    proto_2.y = function (_super) {
        var _this = this;
        var lambda = function () {
            return function (x) { return _this; }; // New scope.  So should inject new _this capture
        };
    };
    Object.defineProperty(proto_2, "z", {
        set: function (_super) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo2;
}(Foo));
var Foo4 = (function (_super) {
    __extends(Foo4, _super);
    function Foo4(_super) {
        return _super.call(this) || this;
    }
    var proto_3 = Foo4.prototype;
    proto_3.y = function (_super) {
        var _this = this;
        var lambda = function () {
            return function (x) { return _this; }; // New scope.  So should inject new _this capture
        };
    };
    return Foo4;
}(Foo));
