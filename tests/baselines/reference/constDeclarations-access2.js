//// [constDeclarations-access2.ts]
const x = 0

// Errors
x = 1;
x += 2;
x -= 3;
x *= 4;
x /= 5;
x %= 6;
x <<= 7;
x >>= 8;
x >>>= 9;
x &= 10;
x |= 11;
x ^= 12;

x++;
x--;
++x;
--x;

++((x));

// OK
var a = x + 1;

function f(v: number) { }
f(x);

if (x) { }

x;
(x);

-x;
+x;

x.toString();


//// [constDeclarations-access2.js]
const x = 0;
// Errors
x = 1;
x += 2;
x -= 3;
x *= 4;
x /= 5;
x %= 6;
x <<= 7;
x >>= 8;
x >>>= 9;
x &= 10;
x |= 11;
x ^= 12;
x++;
x--;
++x;
--x;
++((x));
// OK
var a = x + 1;
function f(v) { }
f(x);
if (x) { }
x;
(x);
-x;
+x;
x.toString();
