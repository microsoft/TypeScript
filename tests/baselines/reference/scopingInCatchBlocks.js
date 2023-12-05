//// [tests/cases/compiler/scopingInCatchBlocks.ts] ////

//// [scopingInCatchBlocks.ts]
try { } catch(ex1) { 
	throw ex1;
}

try { } catch(ex1) { } // should not error

try { } catch(ex1) { } // should not error

var x = ex1; // should error


//// [scopingInCatchBlocks.js]
try { }
catch (ex1) {
    throw ex1;
}
try { }
catch (ex1) { } // should not error
try { }
catch (ex1) { } // should not error
var x = ex1; // should error
