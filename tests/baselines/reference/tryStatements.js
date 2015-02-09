//// [tryStatements.ts]
function fn() {
    try {

    } catch (x) {
        var x: any;
    }

    try { } finally { }

    try { }catch(z){ } finally { }
}

//// [tryStatements.js]
function fn() {
    try {
    }
    catch (x) {
        var x;
    }
    try { }
    finally { }
    try { }
    catch (z) { }
    finally { }
}
