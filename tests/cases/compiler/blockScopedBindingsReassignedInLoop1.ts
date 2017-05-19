declare function use(n: number): void;
(function () {
  'use strict'
  for (let i = 0; i < 9; ++i) {
    (() => use(++i))();
  }
})();