//// [invalidTryStatements2.ts]
function fn() {
    try {
    } catch { // syntax error, missing '(x)'
    }

    catch(x) { } // error missing try

    finally{ } // potential error; can be absorbed by the 'catch'
}

function fn2() {
    finally { } // error missing try
    catch (x) { } // error missing try

    // no error
    try {
    }
    finally {
    }

    // error missing try
    finally {
    }

    // error missing try
    catch (x) {
    }
}

//// [invalidTryStatements2.js]
function fn() {
    try {
    }
    catch () {
    }
    try {
    }
    catch (x) { } // error missing try
    finally { } // potential error; can be absorbed by the 'catch'
}
function fn2() {
    try {
    }
    finally { } // error missing try
    try {
    }
    catch (x) { } // error missing try
    // no error
    try {
    }
    finally {
    }
    // error missing try
    try {
    }
    finally {
    }
    // error missing try
    try {
    }
    catch (x) {
    }
}
