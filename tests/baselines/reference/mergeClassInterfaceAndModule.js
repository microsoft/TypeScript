//// [tests/cases/conformance/classes/classDeclarations/mergeClassInterfaceAndModule.ts] ////

//// [mergeClassInterfaceAndModule.ts]
interface C1 {}
declare class C1 {}
namespace C1 {}

declare class C2 {}
interface C2 {}
namespace C2 {}

declare class C3 {}
namespace C3 {}
interface C3 {}

namespace C4 {}
declare class C4 {} // error -- class declaration must precede module declaration
interface C4 {}

//// [mergeClassInterfaceAndModule.js]
