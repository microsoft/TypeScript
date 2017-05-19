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
var CalcButton = (function () {
    function CalcButton() {
    }
    CalcButton.prototype.a = function () { this.onClick(); };
    CalcButton.prototype.onClick = function () { };
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
    return CalcButton2;
}());
var c = new CalcButton();
c.a();
var c2 = new CalcButton2();
c2.b();
