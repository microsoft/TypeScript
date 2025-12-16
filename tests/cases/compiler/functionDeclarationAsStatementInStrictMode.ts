// @strict: true
// @target: ES2020

// Error cases - function declarations as direct children of statements in strict mode
if (true) function f1() {}
while (true) function f2() {}
do function f3() {} while (false);
for (;;) function f4() {}
for (let x in {}) function f5() {}
for (let x of []) function f6() {}
label: function f7() {}

// Valid cases - function declarations inside blocks
if (true) { function g1() {} }
while (true) { function g2() {} }
do { function g3() {} } while (false);
for (;;) { function g4() {} }
for (let x in {}) { function g5() {} }
for (let x of []) { function g6() {} }
label: { function g7() {} }

// Valid - top level
function topLevel() {}

// Valid - inside function body
function outer() {
    function inner() {}
}
