//// [50527.ts]
type S = 
| { type: 'string', value: string } 
| { type: 'number', value: number } 
| { type: 'unknown', value: unknown }
| { value: undefined };

declare var s: S

if (s.value !== undefined) {
  s;
}


//// [50527.js]
"use strict";
if (s.value !== undefined) {
    s;
}
