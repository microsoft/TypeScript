//// [tests/cases/compiler/stringRawType.ts] ////

//// [stringRawType.ts]
String.raw({ raw: ["foo", "bar", "baz"] }, 1, 2);


//// [stringRawType.js]
"use strict";
String.raw({ raw: ["foo", "bar", "baz"] }, 1, 2);
