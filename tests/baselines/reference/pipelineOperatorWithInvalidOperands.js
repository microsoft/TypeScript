//// [pipelineOperatorWithInvalidOperands.ts]
var a: any;
var b: number;
var c: undefined;
var d: null;
var e: boolean;
var f: object;
var h: string;
var g: Number;
var k: { a: number };

var r1a1 = a |> a; //ok
var r1a2 = a |> b;
var r1a3 = a |> c; //ok
var r1a4 = a |> d; //ok
var r1a5 = a |> e;
var r1a6 = a |> f;
var r1a7 = a |> h;
var r1a8 = a |> g;
var r1a9 = a |> k;


//// [pipelineOperatorWithInvalidOperands.js]
var a;
var b;
var c;
var d;
var e;
var f;
var h;
var g;
var k;
var r1a1 = (_ref_1 = a, a(_ref_1)); //ok
var r1a2 = (_ref_2 = a, b(_ref_2));
var r1a3 = (_ref_3 = a, c(_ref_3)); //ok
var r1a4 = (_ref_4 = a, d(_ref_4)); //ok
var r1a5 = (_ref_5 = a, e(_ref_5));
var r1a6 = (_ref_6 = a, f(_ref_6));
var r1a7 = (_ref_7 = a, h(_ref_7));
var r1a8 = (_ref_8 = a, g(_ref_8));
var r1a9 = (_ref_9 = a, k(_ref_9));
var _ref_1, _ref_2, _ref_3, _ref_4, _ref_5, _ref_6, _ref_7, _ref_8, _ref_9;
