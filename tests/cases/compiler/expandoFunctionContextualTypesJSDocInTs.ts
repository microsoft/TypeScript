// GH #38532
import Foo from "blah";

export function Foo() { }

// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };
