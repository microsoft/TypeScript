//// [tests/cases/compiler/emitBundleWithShebangAndPrologueDirectives1.ts] ////

//// [test.ts]
#!/usr/bin/env gjs
"use strict"
class Doo {}
class Scooby extends Doo {}

//// [outFile.js]
#!/usr/bin/env gjs
"use strict";
class Doo {
}
class Scooby extends Doo {
}
