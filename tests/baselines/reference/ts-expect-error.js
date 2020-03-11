//// [ts-expect-error.ts]
// @ts-expect-error additional commenting
var invalidCommentedFancy: number = 'nope';

// @ts-expect-error additional commenting
var validCommentedFancy: string = 'nope';

// @ts-expect-error
var invalidCommentedPlain: number = 'nope';

// @ts-expect-error
var validCommentedPlain: string = 'nope';

var invalidPlain: number = 'nope';

var validPlain: string = 'nope';


//// [ts-expect-error.js]
// @ts-expect-error additional commenting
var invalidCommentedFancy = 'nope';
// @ts-expect-error additional commenting
var validCommentedFancy = 'nope';
// @ts-expect-error
var invalidCommentedPlain = 'nope';
// @ts-expect-error
var validCommentedPlain = 'nope';
var invalidPlain = 'nope';
var validPlain = 'nope';
