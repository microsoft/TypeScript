function fn() {
    try {
    } catch { // syntax error, missing '(x)'
    }

    catch(x) { } // error missing try

    finally{ } // error missing try
}