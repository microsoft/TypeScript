//// [pipelineOperatorWithCurrying.ts]
var map = <T, R>(fn: (v: T) => R) => (array: T[]) => array.map(fn);
var reduce = <T>(fn: (p: T, v: T) => T) => (array: T[]) => array.reduce(fn);
var inc = (v: number) => v + 1;

var res = [10, 20]
  |> map((x: number) => x * 20)
  |> reduce<number>((res, x) => res + x)
  |> inc;


//// [pipelineOperatorWithCurrying.js]
var map = function (fn) { return function (array) { return array.map(fn); }; };
var reduce = function (fn) { return function (array) { return array.reduce(fn); }; };
var inc = function (v) { return v + 1; };
var res = (_ref_1 = (_ref_2 = (_ref_3 = [10, 20], map(function (x) { return x * 20; })(_ref_3)), reduce(function (res, x) { return res + x; })(_ref_2)), inc(_ref_1));
var _ref_1, _ref_2, _ref_3;
