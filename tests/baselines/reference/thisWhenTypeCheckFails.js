//// [thisWhenTypeCheckFails.ts]
class c {
    public n() {
        var k = () => {
            var s: string = this.n();
        }
    }    
}


//// [thisWhenTypeCheckFails.js]
var c = (function () {
    function c() {
    }
    c.prototype.n = function () {
        var _this = this;
        var k = function k() {
            var s = _this.n();
        };
    };
    return c;
}());
