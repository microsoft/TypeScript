// Error
var {h?} = { h?: 1 };
var {i}: string | number = { i: 2 };
var {i1}: string | number| {} = { i1: 2 };
var { f2: {f21} = { f212: "string" } }: any = undefined;
var { ...d1 } = {
    a: 1, b: 1, d1: 9, e: 10
}
var {1} = { 1 };
var {"prop"} = { "prop": 1 };