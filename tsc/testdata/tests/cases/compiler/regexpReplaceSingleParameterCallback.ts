// @target: es2015
// @strict: true

declare const pattern: RegExp;
declare const replace: (value: string) => string;
"".replace(pattern, replace);
