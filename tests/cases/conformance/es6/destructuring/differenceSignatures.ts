interface A { a: number }
interface Call1 { (): void }
interface Call2 { (a: number): number }
interface Construct1 { new (): void }
interface Construct2 { new (a: number): void }
let diffCall: Call1 - Call2;
let diffConstruct: Construct1 - Construct2;
let nodiffCall: Call1 - A;
let noDiffConstruct: Construct1 - A;
let noCall: A - Call1;
let noConstruct: A - Construct1;
