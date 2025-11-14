// @target: ES6
// @module: amd


// @Filename: constDeclarations_access_1.ts
export const x = 0;

// @Filename: constDeclarations_access_2.ts
///<reference path='constDeclarations_access_1.ts'/>
import m = require('constDeclarations_access_1');
// Errors
m.x = 1;
m.x += 2;
m.x -= 3;
m.x *= 4;
m.x /= 5;
m.x %= 6;
m.x <<= 7;
m.x >>= 8;
m.x >>>= 9;
m.x &= 10;
m.x |= 11;
m.x ^= 12;
m
m.x++;
m.x--;
++m.x;
--m.x;

++((m.x));

m["x"] = 0;

// OK
var a = m.x + 1;

function f(v: number) { }
f(m.x);

if (m.x) { }

m.x;
(m.x);

-m.x;
+m.x;

m.x.toString();
