//// [tests/cases/conformance/statements/tryStatements/invalidTryStatements.ts] ////

//// [invalidTryStatements.ts]
function fn() {
    catch(x) { } // error missing try

    finally { } // potential error; can be absorbed by the 'catch'

    try { }; // error missing finally
}

function fn2() {
    finally { } // error missing try
    catch (x) { } // error missing try
    
    try { } finally { } // statement is here, so the 'catch' clause above doesn't absorb errors from the 'finally' clause below

    finally { } // error missing try
    
    catch (x) { } // error missing try

    try { } catch () { } // error missing catch binding
}

//// [invalidTryStatements.js]
function fn() {
    try {
    }
    catch (x) { } // error missing try
    finally { } // potential error; can be absorbed by the 'catch'
    try { }
    finally { // error missing finally
     } // error missing finally
    ; // error missing finally
}
function fn2() {
    try {
    }
    finally { } // error missing try
    try {
    }
    catch (x) { } // error missing try
    try { }
    finally { } // statement is here, so the 'catch' clause above doesn't absorb errors from the 'finally' clause below
    try {
    }
    finally { } // error missing try
    try {
    }
    catch (x) { } // error missing try
    try { }
    catch () { } // error missing catch binding
}
