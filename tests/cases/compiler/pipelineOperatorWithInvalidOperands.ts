// @experimentalPipelineOperator: true
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
