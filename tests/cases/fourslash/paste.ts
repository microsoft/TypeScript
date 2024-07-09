/// <reference path="fourslash.ts" />

//// fn(/**/);

goTo.marker();
edit.paste('x,y,z');
verify.currentLineContentIs('fn(x, y, z);');

