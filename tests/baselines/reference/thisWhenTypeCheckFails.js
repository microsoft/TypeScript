//// [tests/cases/compiler/thisWhenTypeCheckFails.ts] ////

//// [thisWhenTypeCheckFails.ts]
class c {
    public n() {
        var k = () => {
            var s: string = this.n();
        }
    }    
}


//// [thisWhenTypeCheckFails.js]
var c = /** @class */ (function () {
    function c() {
    }
    c.prototype.n = function () {
        var _this = this;
        var k = function () {
            var s = _this.n();
        };
    };
    return c;
}());
