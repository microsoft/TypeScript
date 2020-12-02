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
var CalcButton = /** @class */ (function () {
    function CalcButton() {
    }
    var CalcButton_prototype = CalcButton.prototype;
    CalcButton_prototype.a = function () { this.onClick(); };
    CalcButton_prototype.onClick = function () { };
    return CalcButton;
}());
var CalcButton2 = /** @class */ (function () {
    function CalcButton2() {
    }
    var CalcButton2_prototype = CalcButton2.prototype;
    CalcButton2_prototype.b = function () {
        var _this = this;
        (function () { return _this.onClick(); });
    };
    CalcButton2_prototype.onClick = function () { };
    return CalcButton2;
}());
var c = new CalcButton();
c.a();
var c2 = new CalcButton2();
c2.b();
