//// [tests/cases/compiler/duplicateIdentifierRelatedSpans1.ts] ////

//// [file1.ts]
class Foo { }
const Bar = 3;
//// [file2.ts]
type Foo = number;
class Bar {}
//// [file3.ts]
type Foo = 54;
let Bar = 42


//// [file1.js]
"use strict";
class Foo {
}
const Bar = 3;
//// [file2.js]
"use strict";
class Bar {
}
//// [file3.js]
"use strict";
let Bar = 42;
