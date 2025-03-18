//// [tests/cases/conformance/statements/tryStatements/tryStatements.ts] ////

//// [tryStatements.ts]
function fn() {
    try { } catch { }

    try { } catch { 
        try { } catch { 
            try { } catch { }
        }
        try { } catch { }
    }

    try { } catch (x) { var x: any; }

    try { } finally { }

    try { } catch { } finally { }

    try { } catch (z) { } finally { }
}

//// [tryStatements.js]
function fn() {
    try { }
    catch { }
    try { }
    catch {
        try { }
        catch {
            try { }
            catch { }
        }
        try { }
        catch { }
    }
    try { }
    catch (x) {
        var x;
    }
    try { }
    finally { }
    try { }
    catch { }
    finally { }
    try { }
    catch (z) { }
    finally { }
}
