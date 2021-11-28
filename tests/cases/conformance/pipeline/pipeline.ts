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
