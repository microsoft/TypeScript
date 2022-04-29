// @module: commonjs
// @Filename: f1.ts
export var x = 1;

// @Filename: f2.ts

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


