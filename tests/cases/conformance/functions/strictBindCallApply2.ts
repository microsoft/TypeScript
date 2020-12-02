// @strictFunctionTypes: false
// @strictBindCallApply: true

// Repro from #32964

interface Foo { blub: string };
function fn(this: Foo) {}

type Test = ThisParameterType<typeof fn>; 

const fb = fn.bind({ blub: "blub" });
