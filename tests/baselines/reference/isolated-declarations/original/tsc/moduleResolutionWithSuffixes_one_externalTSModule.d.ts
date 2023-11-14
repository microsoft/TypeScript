//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalTSModule.ts] ////

//// [/test.ts]
import { ios } from "some-library";

//// [/node_modules/some-library/index.ios.ts]
export function ios() {}
//// [/node_modules/some-library/index.ts]
export function base() {}

/// [Declarations] ////



//// [/bin/test.d.ts]
export {};

/// [Errors] ////

/node_modules/some-library/index.ios.ts(1,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== /test.ts (0 errors) ====
    import { ios } from "some-library";
    
==== /node_modules/some-library/index.ios.ts (1 errors) ====
    export function ios() {}
                    ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
==== /node_modules/some-library/index.ts (0 errors) ====
    export function base() {}