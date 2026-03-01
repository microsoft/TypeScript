//// [tests/cases/compiler/shebangError.ts] ////

//// [shebangError.ts]
var foo = 'Shebang is only allowed on the first line';
#!/usr/bin/env node

//// [shebangError.js]
"use strict";
var foo = 'Shebang is only allowed on the first line';
!/usr/bin / env;
node;
