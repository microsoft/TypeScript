//// [pipelineOperator.ts]
var inc = (x: number) => x + 1;

var res = 10 |> inc;


//// [pipelineOperator.js]
var inc = function (x) { return x + 1; };
var res = (_ref_1 = 10, inc(_ref_1));
var _ref_1;
