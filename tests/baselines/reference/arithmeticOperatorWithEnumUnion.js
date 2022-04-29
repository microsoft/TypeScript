//// [arithmeticOperatorWithEnumUnion.ts]
// operands of an enum type are treated as having the primitive type Number.

enum E {
    a,
    b
}
enum F {
    c,
    d
}

var a: any;
var b: number;
var c: E | F;

// operator *
var ra1 = c * a;
var ra2 = c * b;
var ra3 = c * c;
var ra4 = a * c;
var ra5 = b * c;
var ra6 = E.a * a;
var ra7 = E.a * b;
var ra8 = E.a * E.b;
var ra9 = E.a * 1;
var ra10 = a * E.b;
var ra11 = b * E.b;
var ra12 = 1 * E.b;

// operator /
var rb1 = c / a;
var rb2 = c / b;
var rb3 = c / c;
var rb4 = a / c;
var rb5 = b / c;
var rb6 = E.a / a;
var rb7 = E.a / b;
var rb8 = E.a / E.b;
var rb9 = E.a / 1;
var rb10 = a / E.b;
var rb11 = b / E.b;
var rb12 = 1 / E.b;

// operator %
var rc1 = c % a;
var rc2 = c % b;
var rc3 = c % c;
var rc4 = a % c;
var rc5 = b % c;
var rc6 = E.a % a;
var rc7 = E.a % b;
var rc8 = E.a % E.b;
var rc9 = E.a % 1;
var rc10 = a % E.b;
var rc11 = b % E.b;
var rc12 = 1 % E.b;

// operator -
var rd1 = c - a;
var rd2 = c - b;
var rd3 = c - c;
var rd4 = a - c;
var rd5 = b - c;
var rd6 = E.a - a;
var rd7 = E.a - b;
var rd8 = E.a - E.b;
var rd9 = E.a - 1;
var rd10 = a - E.b;
var rd11 = b - E.b;
var rd12 = 1 - E.b;

// operator <<
var re1 = c << a;
var re2 = c << b;
var re3 = c << c;
var re4 = a << c;
var re5 = b << c;
var re6 = E.a << a;
var re7 = E.a << b;
var re8 = E.a << E.b;
var re9 = E.a << 1;
var re10 = a << E.b;
var re11 = b << E.b;
var re12 = 1 << E.b;

// operator >>
var rf1 = c >> a;
var rf2 = c >> b;
var rf3 = c >> c;
var rf4 = a >> c;
var rf5 = b >> c;
var rf6 = E.a >> a;
var rf7 = E.a >> b;
var rf8 = E.a >> E.b;
var rf9 = E.a >> 1;
var rf10 = a >> E.b;
var rf11 = b >> E.b;
var rf12 = 1 >> E.b;

// operator >>>
var rg1 = c >>> a;
var rg2 = c >>> b;
var rg3 = c >>> c;
var rg4 = a >>> c;
var rg5 = b >>> c;
var rg6 = E.a >>> a;
var rg7 = E.a >>> b;
var rg8 = E.a >>> E.b;
var rg9 = E.a >>> 1;
var rg10 = a >>> E.b;
var rg11 = b >>> E.b;
var rg12 = 1 >>> E.b;

// operator &
var rh1 = c & a;
var rh2 = c & b;
var rh3 = c & c;
var rh4 = a & c;
var rh5 = b & c;
var rh6 = E.a & a;
var rh7 = E.a & b;
var rh8 = E.a & E.b;
var rh9 = E.a & 1;
var rh10 = a & E.b;
var rh11 = b & E.b;
var rh12 = 1 & E.b;

// operator ^
var ri1 = c ^ a;
var ri2 = c ^ b;
var ri3 = c ^ c;
var ri4 = a ^ c;
var ri5 = b ^ c;
var ri6 = E.a ^ a;
var ri7 = E.a ^ b;
var ri8 = E.a ^ E.b;
var ri9 = E.a ^ 1;
var ri10 = a ^ E.b;
var ri11 = b ^ E.b;
var ri12 = 1 ^ E.b;

// operator |
var rj1 = c | a;
var rj2 = c | b;
var rj3 = c | c;
var rj4 = a | c;
var rj5 = b | c;
var rj6 = E.a | a;
var rj7 = E.a | b;
var rj8 = E.a | E.b;
var rj9 = E.a | 1;
var rj10 = a | E.b;
var rj11 = b | E.b;
var rj12 = 1 | E.b;

//// [arithmeticOperatorWithEnumUnion.js]
// operands of an enum type are treated as having the primitive type Number.
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var F;
(function (F) {
    F[F["c"] = 0] = "c";
    F[F["d"] = 1] = "d";
})(F || (F = {}));
var a;
var b;
var c;
// operator *
var ra1 = c * a;
var ra2 = c * b;
var ra3 = c * c;
var ra4 = a * c;
var ra5 = b * c;
var ra6 = E.a * a;
var ra7 = E.a * b;
var ra8 = E.a * E.b;
var ra9 = E.a * 1;
var ra10 = a * E.b;
var ra11 = b * E.b;
var ra12 = 1 * E.b;
// operator /
var rb1 = c / a;
var rb2 = c / b;
var rb3 = c / c;
var rb4 = a / c;
var rb5 = b / c;
var rb6 = E.a / a;
var rb7 = E.a / b;
var rb8 = E.a / E.b;
var rb9 = E.a / 1;
var rb10 = a / E.b;
var rb11 = b / E.b;
var rb12 = 1 / E.b;
// operator %
var rc1 = c % a;
var rc2 = c % b;
var rc3 = c % c;
var rc4 = a % c;
var rc5 = b % c;
var rc6 = E.a % a;
var rc7 = E.a % b;
var rc8 = E.a % E.b;
var rc9 = E.a % 1;
var rc10 = a % E.b;
var rc11 = b % E.b;
var rc12 = 1 % E.b;
// operator -
var rd1 = c - a;
var rd2 = c - b;
var rd3 = c - c;
var rd4 = a - c;
var rd5 = b - c;
var rd6 = E.a - a;
var rd7 = E.a - b;
var rd8 = E.a - E.b;
var rd9 = E.a - 1;
var rd10 = a - E.b;
var rd11 = b - E.b;
var rd12 = 1 - E.b;
// operator <<
var re1 = c << a;
var re2 = c << b;
var re3 = c << c;
var re4 = a << c;
var re5 = b << c;
var re6 = E.a << a;
var re7 = E.a << b;
var re8 = E.a << E.b;
var re9 = E.a << 1;
var re10 = a << E.b;
var re11 = b << E.b;
var re12 = 1 << E.b;
// operator >>
var rf1 = c >> a;
var rf2 = c >> b;
var rf3 = c >> c;
var rf4 = a >> c;
var rf5 = b >> c;
var rf6 = E.a >> a;
var rf7 = E.a >> b;
var rf8 = E.a >> E.b;
var rf9 = E.a >> 1;
var rf10 = a >> E.b;
var rf11 = b >> E.b;
var rf12 = 1 >> E.b;
// operator >>>
var rg1 = c >>> a;
var rg2 = c >>> b;
var rg3 = c >>> c;
var rg4 = a >>> c;
var rg5 = b >>> c;
var rg6 = E.a >>> a;
var rg7 = E.a >>> b;
var rg8 = E.a >>> E.b;
var rg9 = E.a >>> 1;
var rg10 = a >>> E.b;
var rg11 = b >>> E.b;
var rg12 = 1 >>> E.b;
// operator &
var rh1 = c & a;
var rh2 = c & b;
var rh3 = c & c;
var rh4 = a & c;
var rh5 = b & c;
var rh6 = E.a & a;
var rh7 = E.a & b;
var rh8 = E.a & E.b;
var rh9 = E.a & 1;
var rh10 = a & E.b;
var rh11 = b & E.b;
var rh12 = 1 & E.b;
// operator ^
var ri1 = c ^ a;
var ri2 = c ^ b;
var ri3 = c ^ c;
var ri4 = a ^ c;
var ri5 = b ^ c;
var ri6 = E.a ^ a;
var ri7 = E.a ^ b;
var ri8 = E.a ^ E.b;
var ri9 = E.a ^ 1;
var ri10 = a ^ E.b;
var ri11 = b ^ E.b;
var ri12 = 1 ^ E.b;
// operator |
var rj1 = c | a;
var rj2 = c | b;
var rj3 = c | c;
var rj4 = a | c;
var rj5 = b | c;
var rj6 = E.a | a;
var rj7 = E.a | b;
var rj8 = E.a | E.b;
var rj9 = E.a | 1;
var rj10 = a | E.b;
var rj11 = b | E.b;
var rj12 = 1 | E.b;
