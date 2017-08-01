//// [invalidTryStatements.ts]
function fn() {
    try {
    } catch (x) {
        var x: string; // ensure x is 'Any'
    }

    // no type annotation allowed
    try { } catch (z: any) { }
    try { } catch (a: number) { }
    try { } catch (y: string) { }
}



//// [invalidTryStatements.js]
function fn() {
    try {
    }
    catch (x) {
        var x; // ensure x is 'Any'
    }
    // no type annotation allowed
    try { }
    catch (z) { }
    try { }
    catch (a) { }
    try { }
    catch (y) { }
}
