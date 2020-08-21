//// [logicalAssignment9.ts]
declare let x: { a?: boolean };

x.a ??= true;
x.a &&= false;


//// [logicalAssignment9.js]
"use strict";
var _a;
<<<<<<< HEAD
var _b, _c;
(_a = (_b = x).a) !== null && _a !== void 0 ? _a : (_b.a = true);
(_c = x).a && (_c.a = false);
=======
(_a = x.a) !== null && _a !== void 0 ? _a : (x.a = true);
x.a && (x.a = false);
>>>>>>> master
