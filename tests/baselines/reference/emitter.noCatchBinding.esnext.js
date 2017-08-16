//// [emitter.noCatchBinding.esnext.ts]
function f() {
    try { } catch { }
    try { } catch { 
        try { } catch { }
    }
    try { } catch { } finally { }
}

//// [emitter.noCatchBinding.esnext.js]
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
