//// [tests/cases/compiler/arithAssignTyping.ts] ////

//// [arithAssignTyping.ts]
class f { }

f += ''; // error
f += 1; // error
f -= 1; // error
f *= 1; // error
f /= 1; // error
f %= 1; // error
f &= 1; // error
f |= 1; // error
f <<= 1; // error
f >>= 1; // error
f >>>= 1; // error
f ^= 1; // error

//// [arithAssignTyping.js]
class f {
}
f += '';
f += 1;
f -= 1;
f *= 1;
f /= 1;
f %= 1;
f &= 1;
f |= 1;
f <<= 1;
f >>= 1;
f >>>= 1;
f ^= 1;
