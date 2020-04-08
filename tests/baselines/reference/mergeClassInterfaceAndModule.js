//// [mergeClassInterfaceAndModule.ts]
interface C1 {}
declare class C1 {}
module C1 {}

declare class C2 {}
interface C2 {}
module C2 {}

declare class C3 {}
module C3 {}
interface C3 {}

module C4 {}
declare class C4 {} // error -- class declaration must precede module declaration
interface C4 {}

//// [mergeClassInterfaceAndModule.js]
