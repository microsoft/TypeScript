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
var f = (function () {
    function f() {
    }
    return f;
})();
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
