//// [pipeline.ts]
const uried = 'Foobar' |> encodeURI(#);

const squared = 3 |> ((n: number) => n * n)(#);

const makeAdder = (addNum: number) =>
	(addTo: number) => addTo + addNum;

const added = 2 |> (1 |> makeAdder(#));

const zeroOrOne = () => (Math.floor(Math.random() * 2)) % 2;
const ternaryFunctions = 11 |>
	(zeroOrOne() === 0
		? (x: number) => x - 1
		: (x: number) => x + 1
	)(#);

('a' as string) |> console.log(#);
'b' as string |> console.log(#);
const c = 'c' |> ((s: string) => s)(#);

const nestedPipelines = 1 |> (# |> #);


//// [pipeline.js]
var pipelineHackPlaceholder_1, pipelineHackPlaceholder_2, pipelineHackPlaceholder_3, pipelineHackPlaceholder_4, pipelineHackPlaceholder_5, pipelineHackPlaceholder_6, pipelineHackPlaceholder_7, pipelineHackPlaceholder_8, pipelineHackPlaceholder_9, pipelineHackPlaceholder_10;
var uried = (pipelineHackPlaceholder_1 = 'Foobar', encodeURI(pipelineHackPlaceholder_1));
var squared = ((pipelineHackPlaceholder_2 = 3, (function (n) { return n * n; })(pipelineHackPlaceholder_2)));
var makeAdder = function (addNum) {
    return function (addTo) { return addTo + addNum; };
};
var added = (pipelineHackPlaceholder_3 = 2, ((pipelineHackPlaceholder_4 = 1, makeAdder(pipelineHackPlaceholder_4))));
var zeroOrOne = function () { return (Math.floor(Math.random() * 2)) % 2; };
var ternaryFunctions = ((pipelineHackPlaceholder_5 = 11, (zeroOrOne() === 0
    ? function (x) { return x - 1; }
    : function (x) { return x + 1; })(pipelineHackPlaceholder_5)));
(pipelineHackPlaceholder_6 = 'a', console.log(pipelineHackPlaceholder_6));
(pipelineHackPlaceholder_7 = 'b', console.log(pipelineHackPlaceholder_7));
var c = ((pipelineHackPlaceholder_8 = 'c', (function (s) { return s; })(pipelineHackPlaceholder_8)));
var nestedPipelines = (pipelineHackPlaceholder_9 = 1, ((pipelineHackPlaceholder_10 = pipelineHackPlaceholder_9, pipelineHackPlaceholder_10)));
