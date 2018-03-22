// @experimentalPipelineOperator: true
var array = [10, 20, 30];

var last = array |> (a: number[]) => a[a.length - 1];
