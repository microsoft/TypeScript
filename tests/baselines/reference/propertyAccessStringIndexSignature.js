//// [propertyAccessStringIndexSignature.ts]
interface Flags { [name: string]: boolean };
let flags: Flags;
flags.b;
flags.f;
flags.isNotNecessarilyNeverFalse;
flags['this is fine'];

interface Empty { }
let empty: Empty;
empty.nope;
empty["that's ok"];


//// [propertyAccessStringIndexSignature.js]
;
var flags;
flags.b;
flags.f;
flags.isNotNecessarilyNeverFalse;
flags['this is fine'];
var empty;
empty.nope;
empty["that's ok"];
