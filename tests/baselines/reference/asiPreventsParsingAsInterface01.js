//// [asiPreventsParsingAsInterface01.ts]
var interface: number, I: string;

interface   // This should be the identifier 'interface'
I           // This should be the identifier 'I'
{}          // This should be a block body

//// [asiPreventsParsingAsInterface01.js]
var interface, I;
interface; // This should be the identifier 'interface'
I; // This should be the identifier 'I'
{ } // This should be a block body
