//// [ts-expect-error.ts]
// @ts-expect-error additional commenting
var invalidCommentedFancySingle: number = 'nope';

/*
 @ts-expect-error additional commenting */
var invalidCommentedFancyMulti: number = 'nope';

// @ts-expect-error additional commenting
var validCommentedFancySingle: string = 'nope';

/* @ts-expect-error additional commenting */
var validCommentedFancyMulti: string = 'nope';

// @ts-expect-error
var invalidCommentedPlainSingle: number = 'nope';

/*
 @ts-expect-error */
var invalidCommentedPlainMulti: number = 'nope';

// @ts-expect-error
var validCommentedPlainSingle: string = 'nope';

/* @ts-expect-error */
var validCommentedPlainMulti1: string = 'nope';

/*
@ts-expect-error */
var validCommentedPlainMulti2: string = 'nope';

var invalidPlain: number = 'nope';

var validPlain: string = 'nope';

// @ts-expect-error
(({ a: true } as const).a === false); // <-- compiles (as expected via comment)
(({ a: true } as const).a === false); // Should error

(({ a: true } as const).a === false); // error
(({ a: true } as const).a === false); // error

//// [ts-expect-error.js]
// @ts-expect-error additional commenting
var invalidCommentedFancySingle = 'nope';
/*
 @ts-expect-error additional commenting */
var invalidCommentedFancyMulti = 'nope';
// @ts-expect-error additional commenting
var validCommentedFancySingle = 'nope';
/* @ts-expect-error additional commenting */
var validCommentedFancyMulti = 'nope';
// @ts-expect-error
var invalidCommentedPlainSingle = 'nope';
/*
 @ts-expect-error */
var invalidCommentedPlainMulti = 'nope';
// @ts-expect-error
var validCommentedPlainSingle = 'nope';
/* @ts-expect-error */
var validCommentedPlainMulti1 = 'nope';
/*
@ts-expect-error */
var validCommentedPlainMulti2 = 'nope';
var invalidPlain = 'nope';
var validPlain = 'nope';
// @ts-expect-error
({ a: true }.a === false); // <-- compiles (as expected via comment)
({ a: true }.a === false); // Should error
({ a: true }.a === false); // error
({ a: true }.a === false); // error
