//// [letDeclarations-access.ts]
let x = 0

// No errors

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

var a = x + 1;

function f(v: number) { }
f(x);

if (x) { }

x;
(x);

-x;
+x;

x.toString();


//// [letDeclarations-access.js]
let x = 0;
// No errors
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
var a = x + 1;
function f(v) { }
f(x);
if (x) { }
x;
(x);
-x;
+x;
x.toString();
