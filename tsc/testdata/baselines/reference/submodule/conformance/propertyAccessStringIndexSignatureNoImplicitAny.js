//// [tests/cases/conformance/expressions/propertyAccess/propertyAccessStringIndexSignatureNoImplicitAny.ts] ////

//// [propertyAccessStringIndexSignatureNoImplicitAny.ts]
interface Flags { [name: string]: boolean }
let flags: Flags;
flags.b;
flags.f;
flags.isNotNecessarilyNeverFalse;
flags['this is fine'];

interface Empty { }
let empty: Empty;
empty.nope;
empty["not allowed either"];


//// [propertyAccessStringIndexSignatureNoImplicitAny.js]
let flags;
flags.b;
flags.f;
flags.isNotNecessarilyNeverFalse;
flags['this is fine'];
let empty;
empty.nope;
empty["not allowed either"];
