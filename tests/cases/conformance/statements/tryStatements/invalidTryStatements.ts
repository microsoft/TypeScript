function fn() {
    try {
    } catch (x) {
        var x: string; // ensure x is 'Any'
    }

    // no type annotation allowed
    try { } catch (z: any) { }
    try { } catch (a: number) { }
    try { } catch (y: string) { }

    
    try { } catch { 
        let _ignoredCatchParameter; // Should error since we downlevel emit this variable.
    }
}

