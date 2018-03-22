//// [pipelineOperatorMultipleArgumentUse.ts]
var array = [10, 20, 30];

var last = array |> (a: number[]) => a[a.length - 1];


//// [pipelineOperatorMultipleArgumentUse.js]
var array = [10, 20, 30];
var last = (_ref_1 = array, (function (a) { return a[a.length - 1]; })(_ref_1));
var _ref_1;
