//// [noErrorTruncation.ts]
// @noErrorTruncation

type SomeLongOptionA = { someLongOptionA: string }
type SomeLongOptionB = { someLongOptionB: string }
type SomeLongOptionC = { someLongOptionC: string }
type SomeLongOptionD = { someLongOptionD: string }
type SomeLongOptionE = { someLongOptionE: string }
type SomeLongOptionF = { someLongOptionF: string }

const x: SomeLongOptionA
       | SomeLongOptionB
       | SomeLongOptionC
       | SomeLongOptionD
       | SomeLongOptionE
       | SomeLongOptionF = 42;


//// [noErrorTruncation.js]
// @noErrorTruncation
var x = 42;
