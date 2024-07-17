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
var x;
var y = function () { return x; };


//// [app.d.ts]
/// <reference types="lib" preserve="true" />
declare let x: $;
declare let y: () => $;


//// [DtsFileErrors]


/app.d.ts(2,16): error TS2749: '$' refers to a value, but is being used as a type here. Did you mean 'typeof $'?
/app.d.ts(3,22): error TS2749: '$' refers to a value, but is being used as a type here. Did you mean 'typeof $'?


==== /app.d.ts (2 errors) ====
    /// <reference types="lib" preserve="true" />
    declare let x: $;
                   ~
!!! error TS2749: '$' refers to a value, but is being used as a type here. Did you mean 'typeof $'?
    declare let y: () => $;
                         ~
!!! error TS2749: '$' refers to a value, but is being used as a type here. Did you mean 'typeof $'?
    
==== /ref.d.ts (0 errors) ====
    interface $ { x }
    
==== /types/lib/index.d.ts (0 errors) ====
    declare let $: { x: number }
    
    