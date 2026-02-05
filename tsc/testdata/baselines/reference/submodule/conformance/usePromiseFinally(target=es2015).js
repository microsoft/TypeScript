//// [tests/cases/conformance/es2018/usePromiseFinally.ts] ////

//// [usePromiseFinally.ts]
let promise1 = new Promise(function(resolve, reject) {})
                .finally(function() {});


//// [usePromiseFinally.js]
"use strict";
let promise1 = new Promise(function (resolve, reject) { })
    .finally(function () { });
