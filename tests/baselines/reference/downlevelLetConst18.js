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
for (var _x = void 0;;) {
    function foo() { _x; }
    ;
}
for (var _x_1 = void 0;;) {
    (function () { _x_1; })();
}
for (var _x_2 = 1;;) {
    (function () { _x_2; })();
}
for (var _x_3 = void 0;;) {
    ({ foo: function () { _x_3; } });
}
for (var _x_4 = void 0;;) {
    ({ get foo() { return _x_4; } });
}
for (var _x_5 = void 0;;) {
    ({ set foo(v) { _x_5; } });
}
