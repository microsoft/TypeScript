//// [inferTInParentheses.ts]
type F1 = (num: [number]) => void;
type IsNumber<T extends number> = T;

type T1 = F1 extends (...args: (infer T)) => void ? T : never;
type T2 = F1 extends (args: [...(infer T)]) => void ? T : never;
type T3<T> = T extends IsNumber<(infer N)> ? true : false;


//// [inferTInParentheses.js]
