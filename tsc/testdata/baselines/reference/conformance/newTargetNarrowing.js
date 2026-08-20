//// [tests/cases/conformance/es6/newTarget/newTargetNarrowing.ts] ////

//// [newTargetNarrowing.ts]
function foo(x: true) { }

function f() {
  if (new.target.marked === true) {
    foo(new.target.marked);
  }
}

f.marked = true;


//// [newTargetNarrowing.js]
"use strict";
function foo(x) { }
function f() {
    if (new.target.marked === true) {
        foo(new.target.marked);
    }
}
f.marked = true;
