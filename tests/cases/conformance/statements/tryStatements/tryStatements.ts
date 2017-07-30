
function fn() {
    try { } catch { }

    try { } catch (x) { var x: any; }

    try { } finally { }

    try { } catch(z) { } finally { }
}