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
    var _loop_1 = function (i) {
        (function () { return use(++i); })();
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < 9; ++i) {
        _loop_1(i);
        i = out_i_1;
    }
})();
