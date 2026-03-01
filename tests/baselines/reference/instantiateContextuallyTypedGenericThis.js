//// [tests/cases/compiler/instantiateContextuallyTypedGenericThis.ts] ////

//// [instantiateContextuallyTypedGenericThis.ts]
interface JQuery {
    each<T>(
        collection: T[], callback: (this: T, dit: T) => T
    ): T[];
}

let $: JQuery;
let lines: string[];
$.each(lines, function(dit) {
    return dit.charAt(0) + this.charAt(1);
});


//// [instantiateContextuallyTypedGenericThis.js]
"use strict";
let $;
let lines;
$.each(lines, function (dit) {
    return dit.charAt(0) + this.charAt(1);
});
