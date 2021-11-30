//// [stringEndsWith.ts]
declare var test: string;
declare function requirePostfix(input: `${string}test`): void;

// works
if (test.endsWith('test')) requirePostfix(test);
if (test.endsWith('test', undefined)) requirePostfix(test);

// errors
if (test.endsWith('test', 0)) requirePostfix(test);
if (test.endsWith('test', 1)) requirePostfix(test);
if (test.endsWith('test', 0 as number)) requirePostfix(test);
if (test.endsWith('test', 1 as number)) requirePostfix(test);


//// [stringEndsWith.js]
// works
if (test.endsWith('test'))
    requirePostfix(test);
if (test.endsWith('test', undefined))
    requirePostfix(test);
// errors
if (test.endsWith('test', 0))
    requirePostfix(test);
if (test.endsWith('test', 1))
    requirePostfix(test);
if (test.endsWith('test', 0))
    requirePostfix(test);
if (test.endsWith('test', 1))
    requirePostfix(test);
