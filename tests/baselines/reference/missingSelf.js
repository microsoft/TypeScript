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
    var proto_1 = CalcButton.prototype;
    proto_1.a = function () { this.onClick(); };
    proto_1.onClick = function () { };
    return CalcButton;
}());
var CalcButton2 = (function () {
    function CalcButton2() {
    }
    var proto_2 = CalcButton2.prototype;
    proto_2.b = function () {
        var _this = this;
        (function () { return _this.onClick(); });
    };
    proto_2.onClick = function () { };
    return CalcButton2;
}());
var c = new CalcButton();
c.a();
var c2 = new CalcButton2();
c2.b();
