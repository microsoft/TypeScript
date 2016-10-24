//// [differenceSignatures.ts]
interface A { a: number }
interface Call1 { (): void }
interface Construct1 { new (): void }
let nodiffCall: Call1 - ();
let noDiffConstruct: Construct1 - ();
let noCall: A - (a);
let noConstruct: A - (a);


//// [differenceSignatures.js]
var nodiffCall;
var noDiffConstruct;
var noCall;
var noConstruct;
