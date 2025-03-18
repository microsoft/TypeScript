//// [tests/cases/compiler/externalModuleImmutableBindings.ts] ////

//// [f1.ts]
export var x = 1;

//// [f2.ts]
// all mutations below are illegal and should be fixed
import * as stuff from './f1';

var n = 'baz';

stuff.x = 0;
stuff['x'] = 1;
stuff.blah = 2;
stuff[n] = 3;

stuff.x++;
stuff['x']++;
stuff['blah']++;
stuff[n]++;

(stuff.x) = 0;
(stuff['x']) = 1;
(stuff.blah) = 2;
(stuff[n]) = 3;

(stuff.x)++;
(stuff['x'])++;
(stuff['blah'])++;
(stuff[n])++;

for (stuff.x in []) {}
for (stuff.x of []) {}
for (stuff['x'] in []) {}
for (stuff['x'] of []) {}
for (stuff.blah in []) {}
for (stuff.blah of []) {}
for (stuff[n] in []) {}
for (stuff[n] of []) {}

for ((stuff.x) in []) {}
for ((stuff.x) of []) {}
for ((stuff['x']) in []) {}
for ((stuff['x']) of []) {}
for ((stuff.blah) in []) {}
for ((stuff.blah) of []) {}
for ((stuff[n]) in []) {}
for ((stuff[n]) of []) {}




//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stuff = require("./f1");
var n = 'baz';
stuff.x = 0;
stuff['x'] = 1;
stuff.blah = 2;
stuff[n] = 3;
stuff.x++;
stuff['x']++;
stuff['blah']++;
stuff[n]++;
(stuff.x) = 0;
(stuff['x']) = 1;
(stuff.blah) = 2;
(stuff[n]) = 3;
(stuff.x)++;
(stuff['x'])++;
(stuff['blah'])++;
(stuff[n])++;
for (stuff.x in []) { }
for (stuff.x of []) { }
for (stuff['x'] in []) { }
for (stuff['x'] of []) { }
for (stuff.blah in []) { }
for (stuff.blah of []) { }
for (stuff[n] in []) { }
for (stuff[n] of []) { }
for ((stuff.x) in []) { }
for ((stuff.x) of []) { }
for ((stuff['x']) in []) { }
for ((stuff['x']) of []) { }
for ((stuff.blah) in []) { }
for ((stuff.blah) of []) { }
for ((stuff[n]) in []) { }
for ((stuff[n]) of []) { }
