//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop1.ts] ////

//// [blockScopedBindingsReassignedInLoop1.ts]
declare function use(n: number): void;
(function () {
  'use strict'
  for (let i = 0; i < 9; ++i) {
    (() => use(++i))();
  }
})();

//// [blockScopedBindingsReassignedInLoop1.js]
(function () {
    'use strict';
    'use strict';
    for (let i = 0; i < 9; ++i) {
        (() => use(++i))();
    }
})();
