//// [pipelineTopic.ts]
const increment = (a: number) => a + 1;
const add = (a: number, b: number) => a + b;
 
const result = ['a','bb','ccc']
    |> #.map(s => s |> #.length)
    |> #.map(a => a * 2 )
    |> #.filter(a => a > 5)
    |> #.reduce((sum, a) => a+sum, 0)
    |> increment(#)
    |> add(#, 3)

const added = 3 |> #+#+#+#+#;


//// [pipelineTopic.js]
var pipelineHackPlaceholder_1, pipelineHackPlaceholder_2, pipelineHackPlaceholder_3, pipelineHackPlaceholder_4, pipelineHackPlaceholder_5, pipelineHackPlaceholder_6, pipelineHackPlaceholder_7;
var increment = function (a) { return a + 1; };
var add = function (a, b) { return a + b; };
var result = (pipelineHackPlaceholder_1 = (pipelineHackPlaceholder_2 = (pipelineHackPlaceholder_3 = (pipelineHackPlaceholder_4 = (pipelineHackPlaceholder_5 = (pipelineHackPlaceholder_6 = ['a', 'bb', 'ccc'], pipelineHackPlaceholder_6.map(function (s) { var pipelineHackPlaceholder_8; return (pipelineHackPlaceholder_8 = s, pipelineHackPlaceholder_8.length); })), pipelineHackPlaceholder_5.map(function (a) { return a * 2; })), pipelineHackPlaceholder_4.filter(function (a) { return a > 5; })), pipelineHackPlaceholder_3.reduce(function (sum, a) { return a + sum; }, 0)), increment(pipelineHackPlaceholder_2)), add(pipelineHackPlaceholder_1, 3));
var added = (pipelineHackPlaceholder_7 = 3, pipelineHackPlaceholder_7 + pipelineHackPlaceholder_7 + pipelineHackPlaceholder_7 + pipelineHackPlaceholder_7 + pipelineHackPlaceholder_7);
