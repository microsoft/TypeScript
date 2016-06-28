//// [reservedNamesInAliases.ts]
interface I {}
type any = I;
type number = I;
type boolean = I;
type string = I;
type void = I;

//// [reservedNamesInAliases.js]
type;
void ;
I;
