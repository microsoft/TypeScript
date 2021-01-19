//// [varianceResultBetweenIntersectionAndObject.ts]
type X<T, U> = { traits: T & U };
// XX: true
type XX = X<true, true> extends X<any, false> ? false : true;

// Same as above, but with & {} at the end
type Y<T, U> = { traits: T & U } & {};
// YY: false
type YY = Y<true, true> extends Y<any, false> ? false : true;


//// [varianceResultBetweenIntersectionAndObject.js]
