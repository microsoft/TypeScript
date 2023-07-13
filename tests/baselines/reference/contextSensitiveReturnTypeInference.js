//// [tests/cases/compiler/contextSensitiveReturnTypeInference.ts] ////

//// [contextSensitiveReturnTypeInference.ts]
// Repro from #34849

interface IData {
  bar: boolean
}

declare function test<TDependencies>(
  getter: (deps: TDependencies, data: IData) => any,
  deps: TDependencies,
): any 

const DEPS = {
  foo: 1
}

test(
  (deps, data) => ({
    fn1: function() { return deps.foo },
    fn2: data.bar
  }),
  DEPS
);

test(
  (deps: typeof DEPS, data) => ({
    fn1: function() { return deps.foo },
    fn2: data.bar
  }),
  DEPS
);

test(
  (deps, data) => ({
    fn1: () => deps.foo,
    fn2: data.bar
  }),
  DEPS
);

test(
  (deps, data) => {
    return {
      fn1() { return deps.foo },
      fn2: data.bar
    }
  },
  DEPS
);

test(
  (deps) => ({
    fn1() { return deps.foo },
    fn2: 1
  }),
  DEPS
);


//// [contextSensitiveReturnTypeInference.js]
"use strict";
// Repro from #34849
var DEPS = {
    foo: 1
};
test(function (deps, data) { return ({
    fn1: function () { return deps.foo; },
    fn2: data.bar
}); }, DEPS);
test(function (deps, data) { return ({
    fn1: function () { return deps.foo; },
    fn2: data.bar
}); }, DEPS);
test(function (deps, data) { return ({
    fn1: function () { return deps.foo; },
    fn2: data.bar
}); }, DEPS);
test(function (deps, data) {
    return {
        fn1: function () { return deps.foo; },
        fn2: data.bar
    };
}, DEPS);
test(function (deps) { return ({
    fn1: function () { return deps.foo; },
    fn2: 1
}); }, DEPS);
