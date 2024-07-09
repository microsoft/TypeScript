// Error
var {h?} = { h?: 1 };
var {i}: string | number = { i: 2 };
var {i1}: string | number| {} = { i1: 2 };
var { f2: {f21} = { f212: "string" } }: any = undefined;
var {1} = { 1 };
var {"prop"} = { "prop": 1 };
