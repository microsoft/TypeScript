//// [index.js]
function F() { }
!(Array.of.call(F) instanceof F);


//// [index.js]
"use strict";
function F() { }
!(Array.of.call(F) instanceof F);
