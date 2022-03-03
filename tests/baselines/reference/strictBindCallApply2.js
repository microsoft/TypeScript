//// [strictBindCallApply2.ts]
// Repro from #32964

interface Foo { blub: string };
function fn(this: Foo) {}

type Test = ThisParameterType<typeof fn>; 

const fb = fn.bind({ blub: "blub" });


//// [strictBindCallApply2.js]
// Repro from #32964
;
function fn() { }
var fb = fn.bind({ blub: "blub" });
