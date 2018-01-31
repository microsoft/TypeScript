//// [controlFlowObjectLiteralDeclaration.ts]
type Foo = {
  bar?: number[];
}

let f2: Foo = { bar: [] };
f2.bar.push(0)



//// [controlFlowObjectLiteralDeclaration.js]
"use strict";
var f2 = { bar: [] };
f2.bar.push(0);
