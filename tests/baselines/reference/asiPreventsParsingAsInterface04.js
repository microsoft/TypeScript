//// [asiPreventsParsingAsInterface04.ts]
var declare: boolean, interface: number, I: string;

declare     // This should be the identifier 'declare'
interface   // This should be the identifier 'interface'
I           // This should be the identifier 'I'
{}          // This should be a block body

//// [asiPreventsParsingAsInterface04.js]
var declare, interface, I;
declare; // This should be the identifier 'declare'
interface; // This should be the identifier 'interface'
I; // This should be the identifier 'I'
{ } // This should be a block body
