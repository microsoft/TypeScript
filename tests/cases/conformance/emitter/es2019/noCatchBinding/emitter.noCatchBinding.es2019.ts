// @target: es2019
function f() {
    try { } catch { }
    try { } catch { 
        try { } catch { }
    }
    try { } catch { } finally { }
}
