//// [tests/cases/compiler/typeReferenceDirectives6.ts] ////

//// [ref.d.ts]
declare let $: { x: number }
    
//// [index.d.ts]
interface $ { x }


//// [app.ts]
/// <reference path="./ref.d.ts"/>
/// <reference types="lib"/>

let x: $;
let y = () => x



//// [app.js]
"use strict";
/// <reference path="./ref.d.ts"/>
/// <reference types="lib"/>
let x;
let y = () => x;


//// [app.d.ts]
declare let x: $;
declare let y: () => $;


//// [DtsFileErrors]


/app.d.ts(1,16): error TS2592: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery` and then add 'jquery' to the types field in your tsconfig.
/app.d.ts(2,22): error TS2592: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery` and then add 'jquery' to the types field in your tsconfig.


==== /app.d.ts (2 errors) ====
    declare let x: $;
                   ~
!!! error TS2592: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery` and then add 'jquery' to the types field in your tsconfig.
    declare let y: () => $;
                         ~
!!! error TS2592: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery` and then add 'jquery' to the types field in your tsconfig.
    
==== /ref.d.ts (0 errors) ====
    declare let $: { x: number }
        
==== /types/lib/index.d.ts (0 errors) ====
    interface $ { x }
    
    