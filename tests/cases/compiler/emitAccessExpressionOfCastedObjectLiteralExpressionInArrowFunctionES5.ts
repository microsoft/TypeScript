// @target: es5, es2015

(x) => ({ "1": "one", "2": "two" } as { [key: string]: string })[x];
(x) => ({ "1": "one", "2": "two" } as { [key: string]: string }).x;