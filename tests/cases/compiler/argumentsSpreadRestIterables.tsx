// @strict: true
// @noEmit: true
// @target: es5, esnext

declare const itNum: Iterable<number>

;(function(...rest) {})(...itNum)
;(function(a, ...rest) {})('', ...itNum)
;(function(a, ...rest) {})('', true, ...itNum)

declare function fn1<const T extends readonly unknown[]>(...args: T): T;
const res1 = fn1(..."hello");
const res2 = fn1(...itNum);

// repro from #52781
declare function foo<T extends unknown[]>(...args: T): T;
const p = foo(..."hello");
const p2 = foo(...itNum);
