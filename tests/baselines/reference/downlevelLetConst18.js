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
var _loop_1 = function (x) {
    function foo() { x; }
    ;
};
for (var x = void 0;;) {
    _loop_1(x);
}
var _loop_2 = function (x) {
    function foo1() { x; }
    ;
};
for (var x = void 0;;) {
    _loop_2(x);
}
var _loop_3 = function (x) {
    (function () { x; })();
};
for (var x = void 0;;) {
    _loop_3(x);
}
var _loop_4 = function (x) {
    (function () { x; })();
};
for (var x = 1;;) {
    _loop_4(x);
}
var _loop_5 = function (x) {
    ({ foo: function () { x; } });
};
for (var x = void 0;;) {
    _loop_5(x);
}
var _loop_6 = function (x) {
    ({ get foo() { return x; } });
};
for (var x = void 0;;) {
    _loop_6(x);
}
var _loop_7 = function (x) {
    ({ set foo(v) { x; } });
};
for (var x = void 0;;) {
    _loop_7(x);
}
