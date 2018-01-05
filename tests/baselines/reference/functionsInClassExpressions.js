//// [functionsInClassExpressions.ts]
let Foo = class {
    constructor() {
        this.bar++;
    }
    bar = 0;
    inc = () => {
        this.bar++;
    }
    m() { return this.bar; }
}

//// [functionsInClassExpressions.js]
var Foo = /** @class */ (function () {
    function class_1() {
        var _this = this;
        this.bar = 0;
        this.inc = function () {
            _this.bar++;
        };
        this.bar++;
    }
    class_1.prototype.m = function () { return this.bar; };
    return class_1;
}());
