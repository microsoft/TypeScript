//// [tests/cases/compiler/downlevelLetConst18.ts] ////

//// [downlevelLetConst18.ts]
'use strict'

for (let x; ;) {
    function foo() { x };
}

for (let x; ;) {
    function foo1() { x };
}

for (let x; ;) {
    (() => { x })();
}

for (const x = 1; ;) {
    (() => { x })();
}

for (let x; ;) {
    ({ foo() { x }})
}

for (let x; ;) {
    ({ get foo() { return x } })
}

for (let x; ;) {
    ({ set foo(v) { x } })
}


//// [downlevelLetConst18.js]
'use strict';
for (let x;;) {
    function foo() { x; }
    ;
}
for (let x;;) {
    function foo1() { x; }
    ;
}
for (let x;;) {
    (() => { x; })();
}
for (const x = 1;;) {
    (() => { x; })();
}
for (let x;;) {
    ({ foo() { x; } });
}
for (let x;;) {
    ({ get foo() { return x; } });
}
for (let x;;) {
    ({ set foo(v) { x; } });
}
