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
"oops �� oops";
'oops �� oops';
`oops �� oops`;
`${"oops �� oops"}`;
