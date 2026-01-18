// @noImplicitAny: true, false
interface Flags { [name: string]: boolean };
declare let flags: Flags;
flags.b;
flags.f;
flags.isNotNecessarilyNeverFalse;
flags['this is fine'];

interface Empty { }
declare let empty: Empty;
empty.nope;
empty["that's ok"];
