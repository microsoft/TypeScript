// @target: es2015
// @strict: false
declare function f(fn: (a: string) => string);
 
f((input): string => {
    return "." + input;
});
 