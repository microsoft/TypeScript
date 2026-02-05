//// [tests/cases/compiler/emitBundleWithShebang1.ts] ////

//// [emitBundleWithShebang1.ts]
#!/usr/bin/env gjs
class Doo {}
class Scooby extends Doo {}

//// [outFile.js]
#!/usr/bin/env gjs
"use strict";
class Doo {
}
class Scooby extends Doo {
}
