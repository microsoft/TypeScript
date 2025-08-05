//// [tests/cases/compiler/typeReferenceDirectives3.ts] ////

//// [ref.d.ts]
interface $ { x }

//// [index.d.ts]
declare let $: { x: number }

//// [app.ts]
/// <reference types="lib" preserve="true" />
/// <reference path="ref.d.ts" />
interface A {
    x: () => $
}

//// [app.js]
/// <reference types="lib" preserve="true" />
/// <reference path="ref.d.ts" />


//// [app.d.ts]
/// <reference types="lib" preserve="true" />
interface A {
    x: () => $;
}


//// [DtsFileErrors]


/app.d.ts(3,14): error TS2581: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.


==== /app.d.ts (1 errors) ====
    /// <reference types="lib" preserve="true" />
    interface A {
        x: () => $;
                 ~
!!! error TS2581: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.
    }
    
==== /ref.d.ts (0 errors) ====
    interface $ { x }
    
==== /types/lib/index.d.ts (0 errors) ====
    declare let $: { x: number }
    