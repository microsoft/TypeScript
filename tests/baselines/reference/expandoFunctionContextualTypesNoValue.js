//// [tests/cases/compiler/expandoFunctionContextualTypesNoValue.ts] ////

//// [expandoFunctionContextualTypesNoValue.ts]
// GH #38532
import Foo from "blah";

export function Foo() { }

Foo.bar = () => { };


//// [expandoFunctionContextualTypesNoValue.js]
// GH #38532
import Foo from "blah";
export function Foo() { }
Foo.bar = () => { };
