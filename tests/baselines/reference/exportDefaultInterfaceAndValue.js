//// [tests/cases/compiler/exportDefaultInterfaceAndValue.ts] ////

//// [exportDefaultInterfaceAndValue.ts]
export default interface A { a: string; }
export default function() { return 1; }
declare var x: A;


//// [exportDefaultInterfaceAndValue.js]
export default function () { return 1; }
