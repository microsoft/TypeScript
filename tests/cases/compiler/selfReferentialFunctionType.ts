// @strict: true
// @declaration: true

function f<T>(args: typeof f<T>): T { return args; }

function g<T = typeof g>(args: T): T { return args; }

function h<T>(): typeof h<T> { return h; }
