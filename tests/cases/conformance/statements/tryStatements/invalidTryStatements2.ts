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