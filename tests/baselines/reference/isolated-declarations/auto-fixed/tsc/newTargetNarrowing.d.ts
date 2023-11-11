//// [tests/cases/conformance/es6/newTarget/newTargetNarrowing.ts] ////

//// [newTargetNarrowing.ts]
function foo(x: true): void { }

function f(): void {
  if (new.target.marked === true) {
    foo(new.target.marked);
  }
}

f.marked = true;


/// [Declarations] ////



//// [/.src/newTargetNarrowing.d.ts]
declare function foo(x: true): void;
declare function f(): void;
declare namespace f {
    var marked: boolean;
}
