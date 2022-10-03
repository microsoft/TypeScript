// @noImplicitAny: true
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
