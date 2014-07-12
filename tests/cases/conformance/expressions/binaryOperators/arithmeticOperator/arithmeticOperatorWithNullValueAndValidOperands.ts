// If one operand is the null or undefined value, it is treated as having the type of the
// other operand.

enum E {
    a,
    b
}

var a: any;
var b: number;

// operator *
var ra1 = null * a;
var ra2 = null * b;
var ra3 = null * 1;
var ra4 = null * E.a;
var ra5 = a * null;
var ra6 = b * null;
var ra7 = 0 * null;
var ra8 = E.b * null;

// operator /
var rb1 = null / a;
var rb2 = null / b;
var rb3 = null / 1;
var rb4 = null / E.a;
var rb5 = a / null;
var rb6 = b / null;
var rb7 = 0 / null;
var rb8 = E.b / null;

// operator %
var rc1 = null % a;
var rc2 = null % b;
var rc3 = null % 1;
var rc4 = null % E.a;
var rc5 = a % null;
var rc6 = b % null;
var rc7 = 0 % null;
var rc8 = E.b % null;

// operator -
var rd1 = null - a;
var rd2 = null - b;
var rd3 = null - 1;
var rd4 = null - E.a;
var rd5 = a - null;
var rd6 = b - null;
var rd7 = 0 - null;
var rd8 = E.b - null;

// operator <<
var re1 = null << a;
var re2 = null << b;
var re3 = null << 1;
var re4 = null << E.a;
var re5 = a << null;
var re6 = b << null;
var re7 = 0 << null;
var re8 = E.b << null;

// operator >>
var rf1 = null >> a;
var rf2 = null >> b;
var rf3 = null >> 1;
var rf4 = null >> E.a;
var rf5 = a >> null;
var rf6 = b >> null;
var rf7 = 0 >> null;
var rf8 = E.b >> null;

// operator >>>
var rg1 = null >>> a;
var rg2 = null >>> b;
var rg3 = null >>> 1;
var rg4 = null >>> E.a;
var rg5 = a >>> null;
var rg6 = b >>> null;
var rg7 = 0 >>> null;
var rg8 = E.b >>> null;

// operator &
var rh1 = null & a;
var rh2 = null & b;
var rh3 = null & 1;
var rh4 = null & E.a;
var rh5 = a & null;
var rh6 = b & null;
var rh7 = 0 & null;
var rh8 = E.b & null;

// operator ^
var ri1 = null ^ a;
var ri2 = null ^ b;
var ri3 = null ^ 1;
var ri4 = null ^ E.a;
var ri5 = a ^ null;
var ri6 = b ^ null;
var ri7 = 0 ^ null;
var ri8 = E.b ^ null;

// operator |
var rj1 = null | a;
var rj2 = null | b;
var rj3 = null | 1;
var rj4 = null | E.a;
var rj5 = a | null;
var rj6 = b | null;
var rj7 = 0 | null;
var rj8 = E.b | null;