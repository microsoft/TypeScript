// @ts-ignore-enable with additional commenting
var invalidCommentedFancy: number = 'nope';

// @ts-expect-error this line would be overwritten by @ts-ignore-enable
var validCommentedFancy: string = 'nope';

var invalidCommentedPlain: number = 'nope';

// @ts-ignore-disable

var invalidPlain: number = 'nope';

var validCommentedPlain: string = 'nope';

var validPlain: string = 'nope';
