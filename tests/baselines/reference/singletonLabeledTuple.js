//// [tests/cases/compiler/singletonLabeledTuple.ts] ////

//// [singletonLabeledTuple.ts]
type AliasOptional = [p?: number]

// literal type vs type alias
type Literal = [p?: number] extends [unknown] ? true : false // Expect `Literal` to be `false`
type Alias = AliasOptional extends [unknown] ? true : false     // Expect `Alias` to be `false`

// labeled tuple vs normal tuple
type Labeled = [p?: number] extends [unknown] ? true : false   // Expect `Labeled` to be `false`
type Normal = [number?] extends [unknown] ? true : false       // Expect `Normal` to be `false`


type AliasRest = [...p: number[]];

type LiteralRest = [...p: number[]] extends [unknown] ? true : false; // Expect `LiteralRest` to be `false`
type AliasedRest = AliasRest extends [unknown] ? true : false; // Expect `AliasedRest` to be `false`
type NormalRest = [...number[]] extends [unknown] ? true : false; // Expect `NormalRest` to be `false`

//// [singletonLabeledTuple.js]
