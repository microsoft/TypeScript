// @target: esnext
function f() {
    try { } catch { }
    try { } catch { 
        try { } catch { }
    }
    try { } catch { } finally { }
}