//// [tests/cases/compiler/missingSelf.ts] ////

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
class CalcButton {
    a() { this.onClick(); }
    onClick() { }
}
class CalcButton2 {
    b() { () => this.onClick(); }
    onClick() { }
}
var c = new CalcButton();
c.a();
var c2 = new CalcButton2();
c2.b();
