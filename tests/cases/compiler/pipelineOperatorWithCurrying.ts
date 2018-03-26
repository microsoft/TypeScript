// @experimentalPipelineOperator: true
var map = <T, R>(fn: (v: T) => R) => (array: T[]) => array.map(fn);
var reduce = <T>(fn: (p: T, v: T) => T) => (array: T[]) => array.reduce(fn);
var inc = (v: number) => v + 1;

var res = [10, 20]
  |> map((x: number) => x * 20)
  |> reduce<number>((res, x) => res + x)
  |> inc;
