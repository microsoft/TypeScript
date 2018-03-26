//// [pipelineOperatorWithParenthesizedArrowFunctions.ts]
var res1 = [5, 10]
  |> (_: number[]) => _.map((x) => x * 2)
  |> (_: number[]) => _.reduce((a, b) => a + b)
  |> (sum: number) => sum + 1;

var inc = (x: number) => x + 1;
var double = (x: number) => x * 2;

var res2 = [4, 9].map(x => x |> inc |> double);


//// [pipelineOperatorWithParenthesizedArrowFunctions.js]
var res1 = (_ref_1 = [5, 10], (function (_) {
    return _ref_2 = _.map(function (x) { return x * 2; }), (function (_) {
        return _ref_3 = _.reduce(function (a, b) { return a + b; }), (function (sum) { return sum + 1; })(_ref_3);
        var _ref_3;
    })(_ref_2);
    var _ref_2;
})(_ref_1));
var inc = function (x) { return x + 1; };
var double = function (x) { return x * 2; };
var res2 = [4, 9].map(function (x) {
    return _ref_4 = (_ref_5 = x, inc(_ref_5)), double(_ref_4);
    var _ref_4, _ref_5;
});
var _ref_1;
