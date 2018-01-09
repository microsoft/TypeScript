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
var f = /** @class */ (function () {
    function f() {
    }
    return f;
}());
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
