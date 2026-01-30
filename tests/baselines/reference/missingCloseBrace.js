//// [tests/cases/compiler/missingCloseBrace.ts] ////

//// [missingCloseBrace.ts]
function base_init() {
    {

    }

    function me() {

    }


//// [missingCloseBrace.js]
"use strict";
function base_init() {
    {
    }
    function me() {
    }
}
