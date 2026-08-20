//// [tests/cases/conformance/types/typeAliases/reservedNamesInAliases.ts] ////

//// [reservedNamesInAliases.ts]
interface I {}
type any = I;
type number = I;
type boolean = I;
type string = I;
type void = I;
type object = I;


//// [reservedNamesInAliases.js]
"use strict";
type;
void ;
I;
