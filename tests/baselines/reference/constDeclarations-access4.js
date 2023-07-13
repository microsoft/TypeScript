//// [tests/cases/compiler/constDeclarations-access4.ts] ////

//// [constDeclarations-access4.ts]
declare module M {
    const x: number;
}

// Errors
M.x = 1;
M.x += 2;
M.x -= 3;
M.x *= 4;
M.x /= 5;
M.x %= 6;
M.x <<= 7;
M.x >>= 8;
M.x >>>= 9;
M.x &= 10;
M.x |= 11;
M.x ^= 12;

M.x++;
M.x--;
++M.x;
--M.x;

++((M.x));

M["x"] = 0;

// OK
var a = M.x + 1;

function f(v: number) { }
f(M.x);

if (M.x) { }

M.x;
(M.x);

-M.x;
+M.x;

M.x.toString();


//// [constDeclarations-access4.js]
// Errors
M.x = 1;
M.x += 2;
M.x -= 3;
M.x *= 4;
M.x /= 5;
M.x %= 6;
M.x <<= 7;
M.x >>= 8;
M.x >>>= 9;
M.x &= 10;
M.x |= 11;
M.x ^= 12;
M.x++;
M.x--;
++M.x;
--M.x;
++((M.x));
M["x"] = 0;
// OK
var a = M.x + 1;
function f(v) { }
f(M.x);
if (M.x) { }
M.x;
(M.x);
-M.x;
+M.x;
M.x.toString();
