// @strict: true
// @target: es2015

new Map();

const potentiallyUndefinedIterable = [['1', 1], ['2', 2]] as Iterable<[string, number]> | undefined;
new Map(potentiallyUndefinedIterable);

const potentiallyNullIterable = [['1', 1], ['2', 2]] as Iterable<[string, number]> | null;
new Map(potentiallyNullIterable);