//// [tests/cases/compiler/typeReferenceDirectives5.ts] ////

//// [/app.ts]
/// <reference types="lib"/>
import {$} from "./ref";
export interface A {
    x: typeof $;
}
//// [/ref.d.ts]
export interface $ { x }

//// [/types/lib/index.d.ts]
declare let $: { x: number }


/// [Declarations] ////



//// [/app.d.ts]
export interface A {
    x: typeof $;
}

/// [Errors] ////

/app.ts(1,23): error TS9010: Reference directives are not supported in isolated declaration mode.


==== /app.ts (1 errors) ====
    /// <reference types="lib"/>
                          ~~~
!!! error TS9010: Reference directives are not supported in isolated declaration mode.
    import {$} from "./ref";
    export interface A {
        x: typeof $;
    }
==== /ref.d.ts (0 errors) ====
    export interface $ { x }
    
==== /types/lib/index.d.ts (0 errors) ====
    declare let $: { x: number }
    