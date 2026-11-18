// @target: es2015
// @allowJs: true
// @outDir: out

// https://github.com/microsoft/TypeScript/issues/22682

// @filename: a.ts
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

// @filename: b.js
if (Math.random()) class C17 {}
