//// [tests/cases/compiler/importUrlNodeModulesExist.ts] ////

//// [package.json]
{ "name": "foo", "version": "1.0.0" }

//// [index.d.ts]
export declare function useFoo(): string;

//// [index.ts]
import "https://deno.land/std@0.208.0/path/mod.ts"



//// [index.js]
import "https://deno.land/std@0.208.0/path/mod.ts";
