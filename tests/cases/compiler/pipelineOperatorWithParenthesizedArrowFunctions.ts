// @experimentalPipelineOperator: true
var res1 = [5, 10]
  |> (_: number[]) => _.map((x) => x * 2)
  |> (_: number[]) => _.reduce((a, b) => a + b)
  |> (sum: number) => sum + 1;

var inc = (x: number) => x + 1;
var double = (x: number) => x * 2;

var res2 = [4, 9].map(x => x |> inc |> double);
