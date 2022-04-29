//// [functionExpressionContextualTyping3.ts]
// #31114
declare function f<T>(value: T | number): void;
f((a: any) => "")


//// [functionExpressionContextualTyping3.js]
f(function (a) { return ""; });
