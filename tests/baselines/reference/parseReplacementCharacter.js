//// [tests/cases/compiler/parseReplacementCharacter.ts] ////

//// [parseReplacementCharacter.ts]
"oops �� oops";
'oops �� oops';
`oops �� oops`;
`${"oops �� oops"}`;
// oops �� oops
/* oops �� oops */
/** oops �� oops */

//// [parseReplacementCharacter.js]
"use strict";
"oops �� oops";
'oops �� oops';
`oops �� oops`;
`${"oops �� oops"}`;
// oops �� oops
/* oops �� oops */
/** oops �� oops */ 
