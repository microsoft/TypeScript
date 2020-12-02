// forward ref ignored in a typeof
declare let s: typeof s1;
const s1 = "x";

// ignored anywhere in an interface (#35947)
interface Foo2 { [s2]: number; }
const s2 = "x";

// or in a type definition
type Foo3 = { [s3]: number; }
const s3 = "x";
