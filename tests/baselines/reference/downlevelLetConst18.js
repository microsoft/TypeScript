//// [downlevelLetConst18.ts]

'use strict'

for (let x; ;) {
    function foo() { x };
}

for (let x; ;) {
    function foo() { x };
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
for (var x = void 0;;) {
    function foo() { x; }
    ;
}
for (var x = void 0;;) {
    function foo() { x; }
    ;
}
for (var x = void 0;;) {
    (function () { x; })();
}
for (var x = 1;;) {
    (function () { x; })();
}
for (var x = void 0;;) {
    ({ foo: function () { x; } });
}
for (var x = void 0;;) {
    ({ get foo() { return x; } });
}
for (var x = void 0;;) {
    ({ set foo(v) { x; } });
}
