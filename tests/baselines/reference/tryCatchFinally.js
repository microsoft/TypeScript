//// [tests/cases/compiler/tryCatchFinally.ts] ////

//// [tryCatchFinally.ts]
try { } catch(e) { } finally { } 

try {} catch(e) {}

try {} finally {}

//// [tryCatchFinally.js]
try { }
catch (e) { }
finally { }
try { }
catch (e) { }
try { }
finally { }
