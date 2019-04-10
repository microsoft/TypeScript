//// [unionAndIntersectionInference3.ts]
// Repro from #30720

type Maybe<T> = T | undefined;
declare function concatMaybe<T>(...args: (Maybe<T> | Maybe<T>[])[]): T[];
concatMaybe([1, 2, 3], 4);


//// [unionAndIntersectionInference3.js]
"use strict";
// Repro from #30720
concatMaybe([1, 2, 3], 4);
