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
    var proto_1 = c.prototype;
    proto_1.n = function () {
        var _this = this;
        var k = function () {
            var s = _this.n();
        };
    };
    return c;
}());
