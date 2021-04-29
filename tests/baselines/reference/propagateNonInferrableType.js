//// [propagateNonInferrableType.ts]
declare function resolver<T>(): () => void;
declare function wrapResolver<T>(resolverFunction: () => void): void;

wrapResolver(resolver() || []);


//// [propagateNonInferrableType.js]
"use strict";
wrapResolver(resolver() || []);
