//// [tests/cases/compiler/exportDefaultInterfaceAndTwoFunctions.ts] ////

//// [exportDefaultInterfaceAndTwoFunctions.ts]
export default interface A { a: string; }
export default function() { return 1; }
export default function() { return 2; }


//// [exportDefaultInterfaceAndTwoFunctions.js]
export default function () { return 1; }
export default function () { return 2; }
