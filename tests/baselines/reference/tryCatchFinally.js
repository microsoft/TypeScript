//// [tests/cases/compiler/tryCatchFinally.ts] ////

//// [tryCatchFinally.ts]
try { } catch(e) { } finally { } 

try {} catch(e) {}

try {} finally {}

//// [tryCatchFinally.js]
"use strict";
try { }
catch (e) { }
finally { }
try { }
catch (e) { }
try { }
finally { }
