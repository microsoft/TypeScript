//// [localClassesInLoop_ES6.ts]
declare function use(a: any);

"use strict"
var data = [];
for (let x = 0; x < 2; ++x) {
    class C { }
    data.push(() => C);
}

use(data[0]() === data[1]());

//// [localClassesInLoop_ES6.js]
"use strict";
var data = [];
for (let x = 0; x < 2; ++x) {
    class C {
    }
    data.push(() => C);
}
use(data[0]() === data[1]());
