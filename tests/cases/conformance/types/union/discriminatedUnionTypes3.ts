// @strict: true

// Repro from #44435

type Correct = {
	code: string
	property: true
	err: undefined
}
type Err = {
	err: `${string} is wrong!`
}
type SomeReturnType = Correct | Err;

const example: SomeReturnType = {} as SomeReturnType;

if (example.err === undefined) {
	example.property;  // true
}