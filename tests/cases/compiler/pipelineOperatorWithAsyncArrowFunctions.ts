// @target: es5
// @lib: es6
// @noEmitHelpers: true
// @experimentalPipelineOperator: true
function then<T, R>(fn: (value: T) => R) {
  return async (value: Promise<T>): Promise<R> => {
    return fn(await value);
  };
}

var res = 1
  |> (async (x: number) => await x + 1)
  |> then((x: number) => x + 1);
