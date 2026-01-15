class Base {
    public a: string;
}

class Derived extends Base {
    public b: string;
}

class A1 {
    public a: Base;
    public b: Base;
}

class B1 {
    public a: Base;
    public b: Derived;
}

class A2 {
    private a;
}

class B2 extends A2 {
    private b;
}

var a1: A1;
var a2: A2;
var b1: B1;
var b2: B2;

// operator <
var ra1 = a1 < b1;
var ra2 = a2 < b2;
var ra3 = b1 < a1;
var ra4 = b2 < a2;

// operator >
var rb1 = a1 > b1;
var rb2 = a2 > b2;
var rb3 = b1 > a1;
var rb4 = b2 > a2;

// operator <=
var rc1 = a1 <= b1;
var rc2 = a2 <= b2;
var rc3 = b1 <= a1;
var rc4 = b2 <= a2;

// operator >=
var rd1 = a1 >= b1;
var rd2 = a2 >= b2;
var rd3 = b1 >= a1;
var rd4 = b2 >= a2;

// operator ==
var re1 = a1 == b1;
var re2 = a2 == b2;
var re3 = b1 == a1;
var re4 = b2 == a2;

// operator !=
var rf1 = a1 != b1;
var rf2 = a2 != b2;
var rf3 = b1 != a1;
var rf4 = b2 != a2;

// operator ===
var rg1 = a1 === b1;
var rg2 = a2 === b2;
var rg3 = b1 === a1;
var rg4 = b2 === a2;

// operator !==
var rh1 = a1 !== b1;
var rh2 = a2 !== b2;
var rh3 = b1 !== a1;
var rh4 = b2 !== a2;