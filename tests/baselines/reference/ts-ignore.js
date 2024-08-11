//// [tests/cases/conformance/directives/ts-ignore.ts] ////

//// [ts-ignore.ts]
// @ts-ignore with additional commenting
var invalidCommentedFancy: number = 'nope';

// @ts-ignore with additional commenting
var validCommentedFancy: string = 'nope';

// @ts-ignore
var invalidCommentedPlain: number = 'nope';

// @ts-ignore
var validCommentedPlain: string = 'nope';

var invalidPlain: number = 'nope';

var validPlain: string = 'nope';

// @ts-ignore: with additional commenting
var invalidCommentedFancy: number = 'nope';

// @ts-ignore: with additional commenting
var validCommentedFancy: string = 'nope';


//// [ts-ignore.js]
// @ts-ignore with additional commenting
var invalidCommentedFancy = 'nope';
// @ts-ignore with additional commenting
var validCommentedFancy = 'nope';
// @ts-ignore
var invalidCommentedPlain = 'nope';
// @ts-ignore
var validCommentedPlain = 'nope';
var invalidPlain = 'nope';
var validPlain = 'nope';
// @ts-ignore: with additional commenting
var invalidCommentedFancy = 'nope';
// @ts-ignore: with additional commenting
var validCommentedFancy = 'nope';
