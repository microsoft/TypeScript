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

// @ts-expect-error: additional commenting with no whitespace
var invalidCommentedFancySingle: number = 'nope';

/*
 @ts-expect-error: additional commenting with no whitespace */
var invalidCommentedFancyMulti: number = 'nope';
