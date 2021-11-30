// @target: es2015

declare var test: string;
declare function requirePrefix(input: `test${string}`): void;

// works
if (test.startsWith('test')) requirePrefix(test);
if (test.startsWith('test', undefined)) requirePrefix(test);
if (test.startsWith('test', 0)) requirePrefix(test);

// errors
if (test.startsWith('test', 1)) requirePrefix(test);
if (test.startsWith('test', 0 as number)) requirePrefix(test);
if (test.startsWith('test', 1 as number)) requirePrefix(test);
