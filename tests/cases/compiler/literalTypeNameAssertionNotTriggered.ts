// @Filename: /a.ts
import x = require("something");
export { x };

// @Filename: /b.ts
import a = require('./a');
declare function f<T>(obj: T, key: keyof T): void;
f(a, "");
