type AliasArray = [p?: number]

// literal type vs type alias
type Literal = [p?: number] extends [unknown] ? true : false // Expect `Literal` to be `false`
type Alias = AliasArray extends [unknown] ? true : false     // Expect `Alias` to be `false`

// labeled tuple vs normal tuple
type Labeled = [p?: number] extends [unknown] ? true : false   // Expect `Labeled` to be `false`
type Normal = [number?] extends [unknown] ? true : false       // Expect `Normal` to be `false`