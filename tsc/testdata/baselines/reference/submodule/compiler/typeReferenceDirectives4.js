//// [tests/cases/compiler/typeReferenceDirectives4.ts] ////

//// [ref.d.ts]
interface $ { x }

//// [index.d.ts]
declare let $: { x: number }


//// [app.ts]
/// <reference path="./ref.d.ts"/>
/// <reference types="lib" preserve="true" />

let x: $;
let y = () => x

//// [app.js]
/// <reference path="./ref.d.ts"/>
/// <reference types="lib" preserve="true" />
let x;
let y = () => x;


//// [app.d.ts]
/// <reference types="lib" preserve="true" />
declare let x: $;
declare let y: () => $;


//// [DtsFileErrors]


/app.d.ts(2,16): error TS2581: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.
/app.d.ts(3,22): error TS2581: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.


==== /app.d.ts (2 errors) ====
    /// <reference types="lib" preserve="true" />
    declare let x: $;
                   ~
!!! error TS2581: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.
    declare let y: () => $;
                         ~
!!! error TS2581: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery`.
    
==== /ref.d.ts (0 errors) ====
    interface $ { x }
    
==== /types/lib/index.d.ts (0 errors) ====
    declare let $: { x: number }
    
    