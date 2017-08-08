//// [missingSelf.ts]
class CalcButton
{
    public a() { this.onClick(); }
    public onClick() { }
}

class CalcButton2
{
    public b() { () => this.onClick(); }
    public onClick() { }
}

var c = new CalcButton();
c.a();
var c2 = new CalcButton2();
c2.b();



//// [missingSelf.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var CalcButton = (function () {
    function CalcButton() {
    }
    CalcButton.prototype.a = function () { this.onClick(); };
    CalcButton.prototype.onClick = function () { };
    __names(CalcButton.prototype, ["a", "onClick"]);
    return CalcButton;
}());
var CalcButton2 = (function () {
    function CalcButton2() {
    }
    CalcButton2.prototype.b = function () {
        var _this = this;
        (function () { return _this.onClick(); });
    };
    CalcButton2.prototype.onClick = function () { };
    __names(CalcButton2.prototype, ["b", "onClick"]);
    return CalcButton2;
}());
var c = new CalcButton();
c.a();
var c2 = new CalcButton2();
c2.b();
