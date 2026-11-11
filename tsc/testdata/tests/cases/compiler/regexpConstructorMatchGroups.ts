// @target: es2018
// @strict: true

declare const pattern: string;
const matches = "".match(new RegExp(pattern));
if (matches) matches.groups;
