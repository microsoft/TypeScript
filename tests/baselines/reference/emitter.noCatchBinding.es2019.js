//// [tests/cases/conformance/emitter/es2019/noCatchBinding/emitter.noCatchBinding.es2019.ts] ////

//// [emitter.noCatchBinding.es2019.ts]
function f() {
    try { } catch { }
    try { } catch { 
        try { } catch { }
    }
    try { } catch { } finally { }
}


//// [emitter.noCatchBinding.es2019.js]
function f() {
    try { }
    catch { }
    try { }
    catch {
        try { }
        catch { }
    }
    try { }
    catch { }
    finally { }
}
