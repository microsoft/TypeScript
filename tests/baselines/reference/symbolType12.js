//// [tests/cases/conformance/es6/Symbols/symbolType12.ts] ////

//// [symbolType12.ts]
var s = Symbol.for("assign");
var str = "";
s *= s;
s *= 0;
s /= s;
s /= 0;
s %= s;
s %= 0;
s += s;
s += 0;
s += "";
str += s;
s -= s;
s -= 0;
s <<= s;
s <<= 0;
s >>= s;
s >>= 0;
s >>>= s;
s >>>= 0;
s &= s;
s &= 0;
s ^= s;
s ^= 0;
s |= s;
s |= 0;

str += (s || str);

//// [symbolType12.js]
var s = Symbol.for("assign");
var str = "";
s *= s;
s *= 0;
s /= s;
s /= 0;
s %= s;
s %= 0;
s += s;
s += 0;
s += "";
str += s;
s -= s;
s -= 0;
s <<= s;
s <<= 0;
s >>= s;
s >>= 0;
s >>>= s;
s >>>= 0;
s &= s;
s &= 0;
s ^= s;
s ^= 0;
s |= s;
s |= 0;
str += (s || str);
