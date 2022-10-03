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
    catch (_a) { }
    try { }
    catch (_b) {
        try { }
        catch (_c) {
            try { }
            catch (_d) { }
        }
        try { }
        catch (_e) { }
    }
    try { }
    catch (x) {
        var x;
    }
    try { }
    finally { }
    try { }
    catch (_f) { }
    finally { }
    try { }
    catch (z) { }
    finally { }
}
