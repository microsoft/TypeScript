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
var _a = function(x)  {
    function foo() { x; }
    ;
};
for (var x = void 0;;) _a(x);
var _b = function(x)  {
    function foo() { x; }
    ;
};
for (var x = void 0;;) _b(x);
var _c = function(x)  {
    (function () { x; })();
};
for (var x = void 0;;) _c(x);
var _d = function(x)  {
    (function () { x; })();
};
for (var x = 1;;) _d(x);
var _e = function(x)  {
    ({ foo: function () { x; } });
};
for (var x = void 0;;) _e(x);
var _f = function(x)  {
    ({ get foo() { return x; } });
};
for (var x = void 0;;) _f(x);
var _g = function(x)  {
    ({ set foo(v) { x; } });
};
for (var x = void 0;;) _g(x);
