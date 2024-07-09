//// [tests/cases/conformance/expressions/binaryOperators/arithmeticOperator/arithmeticOperatorWithInvalidOperands.ts] ////

//// [arithmeticOperatorWithInvalidOperands.ts]
// these operators require their operands to be of type Any, the Number primitive type, or
// an enum type
enum E { a, b, c }

var a: any;
var b: boolean;
var c: number;
var d: string;
var e: { a: number };
var f: Number;

// All of the below should be an error unless otherwise noted
// operator *
var r1a1 = a * a; //ok
var r1a2 = a * b;
var r1a3 = a * c; //ok
var r1a4 = a * d;
var r1a5 = a * e;
var r1a6 = a * f;

var r1b1 = b * a;
var r1b2 = b * b;
var r1b3 = b * c;
var r1b4 = b * d;
var r1b5 = b * e;
var r1b6 = b * f;

var r1c1 = c * a; //ok
var r1c2 = c * b;
var r1c3 = c * c; //ok
var r1c4 = c * d;
var r1c5 = c * e;
var r1c6 = c * f;

var r1d1 = d * a;
var r1d2 = d * b;
var r1d3 = d * c;
var r1d4 = d * d;
var r1d5 = d * e;
var r1d6 = d * f;

var r1e1 = e * a;
var r1e2 = e * b;
var r1e3 = e * c;
var r1e4 = e * d;
var r1e5 = e * e;
var r1e6 = e * f;

var r1f1 = f * a;
var r1f2 = f * b;
var r1f3 = f * c;
var r1f4 = f * d;
var r1f5 = f * e;
var r1f6 = f * f;

var r1g1 = E.a * a; //ok
var r1g2 = E.a * b;
var r1g3 = E.a * c; //ok
var r1g4 = E.a * d;
var r1g5 = E.a * e;
var r1g6 = E.a * f;

var r1h1 = a * E.b; //ok
var r1h2 = b * E.b;
var r1h3 = c * E.b; //ok
var r1h4 = d * E.b;
var r1h5 = e * E.b;
var r1h6 = f * E.b;

// operator /
var r2a1 = a / a; //ok
var r2a2 = a / b;
var r2a3 = a / c; //ok
var r2a4 = a / d;
var r2a5 = a / e;
var r2a6 = a / f;

var r2b1 = b / a;
var r2b2 = b / b;
var r2b3 = b / c;
var r2b4 = b / d;
var r2b5 = b / e;
var r2b6 = b / f;

var r2c1 = c / a; //ok
var r2c2 = c / b;
var r2c3 = c / c; //ok
var r2c4 = c / d;
var r2c5 = c / e;
var r2c6 = c / f;

var r2d1 = d / a;
var r2d2 = d / b;
var r2d3 = d / c;
var r2d4 = d / d;
var r2d5 = d / e;
var r2d6 = d / f;

var r2e1 = e / a;
var r2e2 = e / b;
var r2e3 = e / c;
var r2e4 = e / d;
var r2e5 = e / e;
var r2e6 = e / f;

var r2f1 = f / a;
var r2f2 = f / b;
var r2f3 = f / c;
var r2f4 = f / d;
var r2f5 = f / e;
var r2f6 = f / f;

var r2g1 = E.a / a; //ok
var r2g2 = E.a / b;
var r2g3 = E.a / c; //ok
var r2g4 = E.a / d;
var r2g5 = E.a / e;
var r2g6 = E.a / f;

var r2h1 = a / E.b; //ok
var r2h2 = b / E.b;
var r2h3 = c / E.b; //ok
var r2h4 = d / E.b;
var r2h5 = e / E.b;
var r2h6 = f / E.b;

// operator %
var r3a1 = a % a; //ok
var r3a2 = a % b;
var r3a3 = a % c; //ok
var r3a4 = a % d;
var r3a5 = a % e;
var r3a6 = a % f;

var r3b1 = b % a;
var r3b2 = b % b;
var r3b3 = b % c;
var r3b4 = b % d;
var r3b5 = b % e;
var r3b6 = b % f;

var r3c1 = c % a; //ok
var r3c2 = c % b;
var r3c3 = c % c; //ok
var r3c4 = c % d;
var r3c5 = c % e;
var r3c6 = c % f;

var r3d1 = d % a;
var r3d2 = d % b;
var r3d3 = d % c;
var r3d4 = d % d;
var r3d5 = d % e;
var r3d6 = d % f;

var r3e1 = e % a;
var r3e2 = e % b;
var r3e3 = e % c;
var r3e4 = e % d;
var r3e5 = e % e;
var r3e6 = e % f;

var r3f1 = f % a;
var r3f2 = f % b;
var r3f3 = f % c;
var r3f4 = f % d;
var r3f5 = f % e;
var r3f6 = f % f;

var r3g1 = E.a % a; //ok
var r3g2 = E.a % b;
var r3g3 = E.a % c; //ok
var r3g4 = E.a % d;
var r3g5 = E.a % e;
var r3g6 = E.a % f;

var r3h1 = a % E.b; //ok
var r3h2 = b % E.b;
var r3h3 = c % E.b; //ok
var r3h4 = d % E.b;
var r3h5 = e % E.b;
var r3h6 = f % E.b;

// operator -
var r4a1 = a - a; //ok
var r4a2 = a - b;
var r4a3 = a - c; //ok
var r4a4 = a - d;
var r4a5 = a - e;
var r4a6 = a - f;

var r4b1 = b - a;
var r4b2 = b - b;
var r4b3 = b - c;
var r4b4 = b - d;
var r4b5 = b - e;
var r4b6 = b - f;

var r4c1 = c - a; //ok
var r4c2 = c - b;
var r4c3 = c - c; //ok
var r4c4 = c - d;
var r4c5 = c - e;
var r4c6 = c - f;

var r4d1 = d - a;
var r4d2 = d - b;
var r4d3 = d - c;
var r4d4 = d - d;
var r4d5 = d - e;
var r4d6 = d - f;

var r4e1 = e - a;
var r4e2 = e - b;
var r4e3 = e - c;
var r4e4 = e - d;
var r4e5 = e - e;
var r4e6 = e - f;

var r4f1 = f - a;
var r4f2 = f - b;
var r4f3 = f - c;
var r4f4 = f - d;
var r4f5 = f - e;
var r4f6 = f - f;

var r4g1 = E.a - a; //ok
var r4g2 = E.a - b;
var r4g3 = E.a - c; //ok
var r4g4 = E.a - d;
var r4g5 = E.a - e;
var r4g6 = E.a - f;

var r4h1 = a - E.b; //ok
var r4h2 = b - E.b;
var r4h3 = c - E.b; //ok
var r4h4 = d - E.b;
var r4h5 = e - E.b;
var r4h6 = f - E.b;

// operator <<
var r5a1 = a << a; //ok
var r5a2 = a << b;
var r5a3 = a << c; //ok
var r5a4 = a << d;
var r5a5 = a << e;
var r5a6 = a << f;

var r5b1 = b << a;
var r5b2 = b << b;
var r5b3 = b << c;
var r5b4 = b << d;
var r5b5 = b << e;
var r5b6 = b << f;

var r5c1 = c << a; //ok
var r5c2 = c << b;
var r5c3 = c << c; //ok
var r5c4 = c << d;
var r5c5 = c << e;
var r5c6 = c << f;

var r5d1 = d << a;
var r5d2 = d << b;
var r5d3 = d << c;
var r5d4 = d << d;
var r5d5 = d << e;
var r5d6 = d << f;

var r5e1 = e << a;
var r5e2 = e << b;
var r5e3 = e << c;
var r5e4 = e << d;
var r5e5 = e << e;
var r5e6 = e << f;

var r5f1 = f << a;
var r5f2 = f << b;
var r5f3 = f << c;
var r5f4 = f << d;
var r5f5 = f << e;
var r5f6 = f << f;

var r5g1 = E.a << a; //ok
var r5g2 = E.a << b;
var r5g3 = E.a << c; //ok
var r5g4 = E.a << d;
var r5g5 = E.a << e;
var r5g6 = E.a << f;

var r5h1 = a << E.b; //ok
var r5h2 = b << E.b;
var r5h3 = c << E.b; //ok
var r5h4 = d << E.b;
var r5h5 = e << E.b;
var r5h6 = f << E.b;

// operator >>
var r6a1 = a >> a; //ok
var r6a2 = a >> b;
var r6a3 = a >> c; //ok
var r6a4 = a >> d;
var r6a5 = a >> e;
var r6a6 = a >> f;

var r6b1 = b >> a;
var r6b2 = b >> b;
var r6b3 = b >> c;
var r6b4 = b >> d;
var r6b5 = b >> e;
var r6b6 = b >> f;

var r6c1 = c >> a; //ok
var r6c2 = c >> b;
var r6c3 = c >> c; //ok
var r6c4 = c >> d;
var r6c5 = c >> e;
var r6c6 = c >> f;

var r6d1 = d >> a;
var r6d2 = d >> b;
var r6d3 = d >> c;
var r6d4 = d >> d;
var r6d5 = d >> e;
var r6d6 = d >> f;

var r6e1 = e >> a;
var r6e2 = e >> b;
var r6e3 = e >> c;
var r6e4 = e >> d;
var r6e5 = e >> e;
var r6e6 = e >> f;

var r6f1 = f >> a;
var r6f2 = f >> b;
var r6f3 = f >> c;
var r6f4 = f >> d;
var r6f5 = f >> e;
var r6f6 = f >> f;

var r6g1 = E.a >> a; //ok
var r6g2 = E.a >> b;
var r6g3 = E.a >> c; //ok
var r6g4 = E.a >> d;
var r6g5 = E.a >> e;
var r6g6 = E.a >> f;

var r6h1 = a >> E.b; //ok
var r6h2 = b >> E.b;
var r6h3 = c >> E.b; //ok
var r6h4 = d >> E.b;
var r6h5 = e >> E.b;
var r6h6 = f >> E.b;

// operator >>>
var r7a1 = a >>> a; //ok
var r7a2 = a >>> b;
var r7a3 = a >>> c; //ok
var r7a4 = a >>> d;
var r7a5 = a >>> e;
var r7a6 = a >>> f;

var r7b1 = b >>> a;
var r7b2 = b >>> b;
var r7b3 = b >>> c;
var r7b4 = b >>> d;
var r7b5 = b >>> e;
var r7b6 = b >>> f;

var r7c1 = c >>> a; //ok
var r7c2 = c >>> b;
var r7c3 = c >>> c; //ok
var r7c4 = c >>> d;
var r7c5 = c >>> e;
var r7c6 = c >>> f;

var r7d1 = d >>> a;
var r7d2 = d >>> b;
var r7d3 = d >>> c;
var r7d4 = d >>> d;
var r7d5 = d >>> e;
var r7d6 = d >>> f;

var r7e1 = e >>> a;
var r7e2 = e >>> b;
var r7e3 = e >>> c;
var r7e4 = e >>> d;
var r7e5 = e >>> e;
var r7e6 = e >>> f;

var r7f1 = f >>> a;
var r7f2 = f >>> b;
var r7f3 = f >>> c;
var r7f4 = f >>> d;
var r7f5 = f >>> e;
var r7f6 = f >>> f;

var r7g1 = E.a >>> a; //ok
var r7g2 = E.a >>> b;
var r7g3 = E.a >>> c; //ok
var r7g4 = E.a >>> d;
var r7g5 = E.a >>> e;
var r7g6 = E.a >>> f;

var r7h1 = a >>> E.b; //ok
var r7h2 = b >>> E.b;
var r7h3 = c >>> E.b; //ok
var r7h4 = d >>> E.b;
var r7h5 = e >>> E.b;
var r7h6 = f >>> E.b;

// operator &
var r8a1 = a & a; //ok
var r8a2 = a & b;
var r8a3 = a & c; //ok
var r8a4 = a & d;
var r8a5 = a & e;
var r8a6 = a & f;

var r8b1 = b & a;
var r8b2 = b & b;
var r8b3 = b & c;
var r8b4 = b & d;
var r8b5 = b & e;
var r8b6 = b & f;

var r8c1 = c & a; //ok
var r8c2 = c & b;
var r8c3 = c & c; //ok
var r8c4 = c & d;
var r8c5 = c & e;
var r8c6 = c & f;

var r8d1 = d & a;
var r8d2 = d & b;
var r8d3 = d & c;
var r8d4 = d & d;
var r8d5 = d & e;
var r8d6 = d & f;

var r8e1 = e & a;
var r8e2 = e & b;
var r8e3 = e & c;
var r8e4 = e & d;
var r8e5 = e & e;
var r8e6 = e & f;

var r8f1 = f & a;
var r8f2 = f & b;
var r8f3 = f & c;
var r8f4 = f & d;
var r8f5 = f & e;
var r8f6 = f & f;

var r8g1 = E.a & a; //ok
var r8g2 = E.a & b;
var r8g3 = E.a & c; //ok
var r8g4 = E.a & d;
var r8g5 = E.a & e;
var r8g6 = E.a & f;

var r8h1 = a & E.b; //ok
var r8h2 = b & E.b;
var r8h3 = c & E.b; //ok
var r8h4 = d & E.b;
var r8h5 = e & E.b;
var r8h6 = f & E.b;

// operator ^
var r9a1 = a ^ a; //ok
var r9a2 = a ^ b;
var r9a3 = a ^ c; //ok
var r9a4 = a ^ d;
var r9a5 = a ^ e;
var r9a6 = a ^ f;

var r9b1 = b ^ a;
var r9b2 = b ^ b;
var r9b3 = b ^ c;
var r9b4 = b ^ d;
var r9b5 = b ^ e;
var r9b6 = b ^ f;

var r9c1 = c ^ a; //ok
var r9c2 = c ^ b;
var r9c3 = c ^ c; //ok
var r9c4 = c ^ d;
var r9c5 = c ^ e;
var r9c6 = c ^ f;

var r9d1 = d ^ a;
var r9d2 = d ^ b;
var r9d3 = d ^ c;
var r9d4 = d ^ d;
var r9d5 = d ^ e;
var r9d6 = d ^ f;

var r9e1 = e ^ a;
var r9e2 = e ^ b;
var r9e3 = e ^ c;
var r9e4 = e ^ d;
var r9e5 = e ^ e;
var r9e6 = e ^ f;

var r9f1 = f ^ a;
var r9f2 = f ^ b;
var r9f3 = f ^ c;
var r9f4 = f ^ d;
var r9f5 = f ^ e;
var r9f6 = f ^ f;

var r9g1 = E.a ^ a; //ok
var r9g2 = E.a ^ b;
var r9g3 = E.a ^ c; //ok
var r9g4 = E.a ^ d;
var r9g5 = E.a ^ e;
var r9g6 = E.a ^ f;

var r9h1 = a ^ E.b; //ok
var r9h2 = b ^ E.b;
var r9h3 = c ^ E.b; //ok
var r9h4 = d ^ E.b;
var r9h5 = e ^ E.b;
var r9h6 = f ^ E.b;

// operator |
var r10a1 = a | a; //ok
var r10a2 = a | b;
var r10a3 = a | c; //ok
var r10a4 = a | d;
var r10a5 = a | e;
var r10a6 = a | f;

var r10b1 = b | a;
var r10b2 = b | b;
var r10b3 = b | c;
var r10b4 = b | d;
var r10b5 = b | e;
var r10b6 = b | f;

var r10c1 = c | a; //ok
var r10c2 = c | b;
var r10c3 = c | c; //ok
var r10c4 = c | d;
var r10c5 = c | e;
var r10c6 = c | f;

var r10d1 = d | a;
var r10d2 = d | b;
var r10d3 = d | c;
var r10d4 = d | d;
var r10d5 = d | e;
var r10d6 = d | f;

var r10e1 = e | a;
var r10e2 = e | b;
var r10e3 = e | c;
var r10e4 = e | d;
var r10e5 = e | e;
var r10e6 = e | f;

var r10f1 = f | a;
var r10f2 = f | b;
var r10f3 = f | c;
var r10f4 = f | d;
var r10f5 = f | e;
var r10f6 = f | f;

var r10g1 = E.a | a; //ok
var r10g2 = E.a | b;
var r10g3 = E.a | c; //ok
var r10g4 = E.a | d;
var r10g5 = E.a | e;
var r10g6 = E.a | f;

var r10h1 = a | E.b; //ok
var r10h2 = b | E.b;
var r10h3 = c | E.b; //ok
var r10h4 = d | E.b;
var r10h5 = e | E.b;
var r10h6 = f | E.b;

//// [arithmeticOperatorWithInvalidOperands.js]
// these operators require their operands to be of type Any, the Number primitive type, or
// an enum type
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
var a;
var b;
var c;
var d;
var e;
var f;
// All of the below should be an error unless otherwise noted
// operator *
var r1a1 = a * a; //ok
var r1a2 = a * b;
var r1a3 = a * c; //ok
var r1a4 = a * d;
var r1a5 = a * e;
var r1a6 = a * f;
var r1b1 = b * a;
var r1b2 = b * b;
var r1b3 = b * c;
var r1b4 = b * d;
var r1b5 = b * e;
var r1b6 = b * f;
var r1c1 = c * a; //ok
var r1c2 = c * b;
var r1c3 = c * c; //ok
var r1c4 = c * d;
var r1c5 = c * e;
var r1c6 = c * f;
var r1d1 = d * a;
var r1d2 = d * b;
var r1d3 = d * c;
var r1d4 = d * d;
var r1d5 = d * e;
var r1d6 = d * f;
var r1e1 = e * a;
var r1e2 = e * b;
var r1e3 = e * c;
var r1e4 = e * d;
var r1e5 = e * e;
var r1e6 = e * f;
var r1f1 = f * a;
var r1f2 = f * b;
var r1f3 = f * c;
var r1f4 = f * d;
var r1f5 = f * e;
var r1f6 = f * f;
var r1g1 = E.a * a; //ok
var r1g2 = E.a * b;
var r1g3 = E.a * c; //ok
var r1g4 = E.a * d;
var r1g5 = E.a * e;
var r1g6 = E.a * f;
var r1h1 = a * E.b; //ok
var r1h2 = b * E.b;
var r1h3 = c * E.b; //ok
var r1h4 = d * E.b;
var r1h5 = e * E.b;
var r1h6 = f * E.b;
// operator /
var r2a1 = a / a; //ok
var r2a2 = a / b;
var r2a3 = a / c; //ok
var r2a4 = a / d;
var r2a5 = a / e;
var r2a6 = a / f;
var r2b1 = b / a;
var r2b2 = b / b;
var r2b3 = b / c;
var r2b4 = b / d;
var r2b5 = b / e;
var r2b6 = b / f;
var r2c1 = c / a; //ok
var r2c2 = c / b;
var r2c3 = c / c; //ok
var r2c4 = c / d;
var r2c5 = c / e;
var r2c6 = c / f;
var r2d1 = d / a;
var r2d2 = d / b;
var r2d3 = d / c;
var r2d4 = d / d;
var r2d5 = d / e;
var r2d6 = d / f;
var r2e1 = e / a;
var r2e2 = e / b;
var r2e3 = e / c;
var r2e4 = e / d;
var r2e5 = e / e;
var r2e6 = e / f;
var r2f1 = f / a;
var r2f2 = f / b;
var r2f3 = f / c;
var r2f4 = f / d;
var r2f5 = f / e;
var r2f6 = f / f;
var r2g1 = E.a / a; //ok
var r2g2 = E.a / b;
var r2g3 = E.a / c; //ok
var r2g4 = E.a / d;
var r2g5 = E.a / e;
var r2g6 = E.a / f;
var r2h1 = a / E.b; //ok
var r2h2 = b / E.b;
var r2h3 = c / E.b; //ok
var r2h4 = d / E.b;
var r2h5 = e / E.b;
var r2h6 = f / E.b;
// operator %
var r3a1 = a % a; //ok
var r3a2 = a % b;
var r3a3 = a % c; //ok
var r3a4 = a % d;
var r3a5 = a % e;
var r3a6 = a % f;
var r3b1 = b % a;
var r3b2 = b % b;
var r3b3 = b % c;
var r3b4 = b % d;
var r3b5 = b % e;
var r3b6 = b % f;
var r3c1 = c % a; //ok
var r3c2 = c % b;
var r3c3 = c % c; //ok
var r3c4 = c % d;
var r3c5 = c % e;
var r3c6 = c % f;
var r3d1 = d % a;
var r3d2 = d % b;
var r3d3 = d % c;
var r3d4 = d % d;
var r3d5 = d % e;
var r3d6 = d % f;
var r3e1 = e % a;
var r3e2 = e % b;
var r3e3 = e % c;
var r3e4 = e % d;
var r3e5 = e % e;
var r3e6 = e % f;
var r3f1 = f % a;
var r3f2 = f % b;
var r3f3 = f % c;
var r3f4 = f % d;
var r3f5 = f % e;
var r3f6 = f % f;
var r3g1 = E.a % a; //ok
var r3g2 = E.a % b;
var r3g3 = E.a % c; //ok
var r3g4 = E.a % d;
var r3g5 = E.a % e;
var r3g6 = E.a % f;
var r3h1 = a % E.b; //ok
var r3h2 = b % E.b;
var r3h3 = c % E.b; //ok
var r3h4 = d % E.b;
var r3h5 = e % E.b;
var r3h6 = f % E.b;
// operator -
var r4a1 = a - a; //ok
var r4a2 = a - b;
var r4a3 = a - c; //ok
var r4a4 = a - d;
var r4a5 = a - e;
var r4a6 = a - f;
var r4b1 = b - a;
var r4b2 = b - b;
var r4b3 = b - c;
var r4b4 = b - d;
var r4b5 = b - e;
var r4b6 = b - f;
var r4c1 = c - a; //ok
var r4c2 = c - b;
var r4c3 = c - c; //ok
var r4c4 = c - d;
var r4c5 = c - e;
var r4c6 = c - f;
var r4d1 = d - a;
var r4d2 = d - b;
var r4d3 = d - c;
var r4d4 = d - d;
var r4d5 = d - e;
var r4d6 = d - f;
var r4e1 = e - a;
var r4e2 = e - b;
var r4e3 = e - c;
var r4e4 = e - d;
var r4e5 = e - e;
var r4e6 = e - f;
var r4f1 = f - a;
var r4f2 = f - b;
var r4f3 = f - c;
var r4f4 = f - d;
var r4f5 = f - e;
var r4f6 = f - f;
var r4g1 = E.a - a; //ok
var r4g2 = E.a - b;
var r4g3 = E.a - c; //ok
var r4g4 = E.a - d;
var r4g5 = E.a - e;
var r4g6 = E.a - f;
var r4h1 = a - E.b; //ok
var r4h2 = b - E.b;
var r4h3 = c - E.b; //ok
var r4h4 = d - E.b;
var r4h5 = e - E.b;
var r4h6 = f - E.b;
// operator <<
var r5a1 = a << a; //ok
var r5a2 = a << b;
var r5a3 = a << c; //ok
var r5a4 = a << d;
var r5a5 = a << e;
var r5a6 = a << f;
var r5b1 = b << a;
var r5b2 = b << b;
var r5b3 = b << c;
var r5b4 = b << d;
var r5b5 = b << e;
var r5b6 = b << f;
var r5c1 = c << a; //ok
var r5c2 = c << b;
var r5c3 = c << c; //ok
var r5c4 = c << d;
var r5c5 = c << e;
var r5c6 = c << f;
var r5d1 = d << a;
var r5d2 = d << b;
var r5d3 = d << c;
var r5d4 = d << d;
var r5d5 = d << e;
var r5d6 = d << f;
var r5e1 = e << a;
var r5e2 = e << b;
var r5e3 = e << c;
var r5e4 = e << d;
var r5e5 = e << e;
var r5e6 = e << f;
var r5f1 = f << a;
var r5f2 = f << b;
var r5f3 = f << c;
var r5f4 = f << d;
var r5f5 = f << e;
var r5f6 = f << f;
var r5g1 = E.a << a; //ok
var r5g2 = E.a << b;
var r5g3 = E.a << c; //ok
var r5g4 = E.a << d;
var r5g5 = E.a << e;
var r5g6 = E.a << f;
var r5h1 = a << E.b; //ok
var r5h2 = b << E.b;
var r5h3 = c << E.b; //ok
var r5h4 = d << E.b;
var r5h5 = e << E.b;
var r5h6 = f << E.b;
// operator >>
var r6a1 = a >> a; //ok
var r6a2 = a >> b;
var r6a3 = a >> c; //ok
var r6a4 = a >> d;
var r6a5 = a >> e;
var r6a6 = a >> f;
var r6b1 = b >> a;
var r6b2 = b >> b;
var r6b3 = b >> c;
var r6b4 = b >> d;
var r6b5 = b >> e;
var r6b6 = b >> f;
var r6c1 = c >> a; //ok
var r6c2 = c >> b;
var r6c3 = c >> c; //ok
var r6c4 = c >> d;
var r6c5 = c >> e;
var r6c6 = c >> f;
var r6d1 = d >> a;
var r6d2 = d >> b;
var r6d3 = d >> c;
var r6d4 = d >> d;
var r6d5 = d >> e;
var r6d6 = d >> f;
var r6e1 = e >> a;
var r6e2 = e >> b;
var r6e3 = e >> c;
var r6e4 = e >> d;
var r6e5 = e >> e;
var r6e6 = e >> f;
var r6f1 = f >> a;
var r6f2 = f >> b;
var r6f3 = f >> c;
var r6f4 = f >> d;
var r6f5 = f >> e;
var r6f6 = f >> f;
var r6g1 = E.a >> a; //ok
var r6g2 = E.a >> b;
var r6g3 = E.a >> c; //ok
var r6g4 = E.a >> d;
var r6g5 = E.a >> e;
var r6g6 = E.a >> f;
var r6h1 = a >> E.b; //ok
var r6h2 = b >> E.b;
var r6h3 = c >> E.b; //ok
var r6h4 = d >> E.b;
var r6h5 = e >> E.b;
var r6h6 = f >> E.b;
// operator >>>
var r7a1 = a >>> a; //ok
var r7a2 = a >>> b;
var r7a3 = a >>> c; //ok
var r7a4 = a >>> d;
var r7a5 = a >>> e;
var r7a6 = a >>> f;
var r7b1 = b >>> a;
var r7b2 = b >>> b;
var r7b3 = b >>> c;
var r7b4 = b >>> d;
var r7b5 = b >>> e;
var r7b6 = b >>> f;
var r7c1 = c >>> a; //ok
var r7c2 = c >>> b;
var r7c3 = c >>> c; //ok
var r7c4 = c >>> d;
var r7c5 = c >>> e;
var r7c6 = c >>> f;
var r7d1 = d >>> a;
var r7d2 = d >>> b;
var r7d3 = d >>> c;
var r7d4 = d >>> d;
var r7d5 = d >>> e;
var r7d6 = d >>> f;
var r7e1 = e >>> a;
var r7e2 = e >>> b;
var r7e3 = e >>> c;
var r7e4 = e >>> d;
var r7e5 = e >>> e;
var r7e6 = e >>> f;
var r7f1 = f >>> a;
var r7f2 = f >>> b;
var r7f3 = f >>> c;
var r7f4 = f >>> d;
var r7f5 = f >>> e;
var r7f6 = f >>> f;
var r7g1 = E.a >>> a; //ok
var r7g2 = E.a >>> b;
var r7g3 = E.a >>> c; //ok
var r7g4 = E.a >>> d;
var r7g5 = E.a >>> e;
var r7g6 = E.a >>> f;
var r7h1 = a >>> E.b; //ok
var r7h2 = b >>> E.b;
var r7h3 = c >>> E.b; //ok
var r7h4 = d >>> E.b;
var r7h5 = e >>> E.b;
var r7h6 = f >>> E.b;
// operator &
var r8a1 = a & a; //ok
var r8a2 = a & b;
var r8a3 = a & c; //ok
var r8a4 = a & d;
var r8a5 = a & e;
var r8a6 = a & f;
var r8b1 = b & a;
var r8b2 = b & b;
var r8b3 = b & c;
var r8b4 = b & d;
var r8b5 = b & e;
var r8b6 = b & f;
var r8c1 = c & a; //ok
var r8c2 = c & b;
var r8c3 = c & c; //ok
var r8c4 = c & d;
var r8c5 = c & e;
var r8c6 = c & f;
var r8d1 = d & a;
var r8d2 = d & b;
var r8d3 = d & c;
var r8d4 = d & d;
var r8d5 = d & e;
var r8d6 = d & f;
var r8e1 = e & a;
var r8e2 = e & b;
var r8e3 = e & c;
var r8e4 = e & d;
var r8e5 = e & e;
var r8e6 = e & f;
var r8f1 = f & a;
var r8f2 = f & b;
var r8f3 = f & c;
var r8f4 = f & d;
var r8f5 = f & e;
var r8f6 = f & f;
var r8g1 = E.a & a; //ok
var r8g2 = E.a & b;
var r8g3 = E.a & c; //ok
var r8g4 = E.a & d;
var r8g5 = E.a & e;
var r8g6 = E.a & f;
var r8h1 = a & E.b; //ok
var r8h2 = b & E.b;
var r8h3 = c & E.b; //ok
var r8h4 = d & E.b;
var r8h5 = e & E.b;
var r8h6 = f & E.b;
// operator ^
var r9a1 = a ^ a; //ok
var r9a2 = a ^ b;
var r9a3 = a ^ c; //ok
var r9a4 = a ^ d;
var r9a5 = a ^ e;
var r9a6 = a ^ f;
var r9b1 = b ^ a;
var r9b2 = b ^ b;
var r9b3 = b ^ c;
var r9b4 = b ^ d;
var r9b5 = b ^ e;
var r9b6 = b ^ f;
var r9c1 = c ^ a; //ok
var r9c2 = c ^ b;
var r9c3 = c ^ c; //ok
var r9c4 = c ^ d;
var r9c5 = c ^ e;
var r9c6 = c ^ f;
var r9d1 = d ^ a;
var r9d2 = d ^ b;
var r9d3 = d ^ c;
var r9d4 = d ^ d;
var r9d5 = d ^ e;
var r9d6 = d ^ f;
var r9e1 = e ^ a;
var r9e2 = e ^ b;
var r9e3 = e ^ c;
var r9e4 = e ^ d;
var r9e5 = e ^ e;
var r9e6 = e ^ f;
var r9f1 = f ^ a;
var r9f2 = f ^ b;
var r9f3 = f ^ c;
var r9f4 = f ^ d;
var r9f5 = f ^ e;
var r9f6 = f ^ f;
var r9g1 = E.a ^ a; //ok
var r9g2 = E.a ^ b;
var r9g3 = E.a ^ c; //ok
var r9g4 = E.a ^ d;
var r9g5 = E.a ^ e;
var r9g6 = E.a ^ f;
var r9h1 = a ^ E.b; //ok
var r9h2 = b ^ E.b;
var r9h3 = c ^ E.b; //ok
var r9h4 = d ^ E.b;
var r9h5 = e ^ E.b;
var r9h6 = f ^ E.b;
// operator |
var r10a1 = a | a; //ok
var r10a2 = a | b;
var r10a3 = a | c; //ok
var r10a4 = a | d;
var r10a5 = a | e;
var r10a6 = a | f;
var r10b1 = b | a;
var r10b2 = b | b;
var r10b3 = b | c;
var r10b4 = b | d;
var r10b5 = b | e;
var r10b6 = b | f;
var r10c1 = c | a; //ok
var r10c2 = c | b;
var r10c3 = c | c; //ok
var r10c4 = c | d;
var r10c5 = c | e;
var r10c6 = c | f;
var r10d1 = d | a;
var r10d2 = d | b;
var r10d3 = d | c;
var r10d4 = d | d;
var r10d5 = d | e;
var r10d6 = d | f;
var r10e1 = e | a;
var r10e2 = e | b;
var r10e3 = e | c;
var r10e4 = e | d;
var r10e5 = e | e;
var r10e6 = e | f;
var r10f1 = f | a;
var r10f2 = f | b;
var r10f3 = f | c;
var r10f4 = f | d;
var r10f5 = f | e;
var r10f6 = f | f;
var r10g1 = E.a | a; //ok
var r10g2 = E.a | b;
var r10g3 = E.a | c; //ok
var r10g4 = E.a | d;
var r10g5 = E.a | e;
var r10g6 = E.a | f;
var r10h1 = a | E.b; //ok
var r10h2 = b | E.b;
var r10h3 = c | E.b; //ok
var r10h4 = d | E.b;
var r10h5 = e | E.b;
var r10h6 = f | E.b;
