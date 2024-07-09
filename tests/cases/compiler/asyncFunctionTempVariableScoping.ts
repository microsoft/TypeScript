// @target: es5
// @lib: es2015
// https://github.com/Microsoft/TypeScript/issues/19187

async ({ foo, bar, ...rest }) => bar(await foo);