//// [pipelineHackAndPApp.ts]
(1.1 + 2.6) |> (# |>> Math.round);

(3) |> (3 |>> ((o) => Math.pow(o, #)));

5.7 |>> ((a) => a |> # * 100);


//// [pipelineHackAndPApp.js]
var pipelineHackPlaceholder_1, pipelineHackPlaceholder_2;
(pipelineHackPlaceholder_1 = (1.1 + 2.6), (Math.round(pipelineHackPlaceholder_1)));
(pipelineHackPlaceholder_2 = (3), ((function (o) { return Math.pow(o, pipelineHackPlaceholder_2); })(3)));
(function (a) { var pipelineHackPlaceholder_3; return (pipelineHackPlaceholder_3 = a, pipelineHackPlaceholder_3 * 100); })(5.7);
