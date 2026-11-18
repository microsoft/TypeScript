//// [tests/cases/compiler/classDeclarationInStatementPosition.ts] ////

//// [a.ts]
declare const cond: boolean;

if (cond) class C1 {}
if (cond) {} else class C2 {}
while (cond) class C3 {}
do class C4 {} while (cond);
for (;;) class C5 {}
for (const k in {}) class C6 {}
for (const v of []) class C7 {}
if (cond) label: class C8 {}

// OK
if (cond) {
    class C10 {}
}
class C11 {}
switch (0) {
    case 0:
        class C12 {}
}
namespace N {
    class C13 {}
}
function f() {
    class C14 {}
    return class C15 {};
}
let x;
if (cond) x = class C16 {};

//// [b.js]
if (Math.random()) class C17 {}


//// [a.js]
"use strict";
if (cond)
    class C1 {
    }
if (cond) { }
else
    class C2 {
    }
while (cond)
    class C3 {
    }
do
    class C4 {
    }
while (cond);
for (;;)
    class C5 {
    }
for (const k in {})
    class C6 {
    }
for (const v of [])
    class C7 {
    }
if (cond)
    label: class C8 {
    }
// OK
if (cond) {
    class C10 {
    }
}
class C11 {
}
switch (0) {
    case 0:
        class C12 {
        }
}
var N;
(function (N) {
    class C13 {
    }
})(N || (N = {}));
function f() {
    class C14 {
    }
    return class C15 {
    };
}
let x;
if (cond)
    x = class C16 {
    };
//// [b.js]
"use strict";
if (Math.random())
    class C17 {
    }
