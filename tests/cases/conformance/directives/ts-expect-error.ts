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

// @ts-expect-error
(({ a: true } as const).a === false); // <-- compiles (as expected via comment)
(({ a: true } as const).a === false); // Should error

(({ a: true } as const).a === false); // error
(({ a: true } as const).a === false); // error