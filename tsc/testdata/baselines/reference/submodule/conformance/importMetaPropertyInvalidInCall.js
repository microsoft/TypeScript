//// [tests/cases/conformance/importDefer/importMetaPropertyInvalidInCall.ts] ////

//// [b.ts]
import.foo();
import.foo;


//// [b.js]
"use strict";
import.foo();
import.foo;
