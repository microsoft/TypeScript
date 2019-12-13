// @strict: true

// Repro from #34797

function f1() {
    let a: number | null = null;
    try {
        a = 123;
        return a;
    }
    catch (e) {
        throw e;
    }
    finally {
        if (a != null && a.toFixed(0) == "123") { 
        }
    }
}

function f2() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        throw e;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f3() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
        return;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1
}

function f4() {
    let x: 0 | 1 | 2 | 3 = 0;
    try {
        x = 1;
    }
    catch (e) {
        x = 2;
    }
    finally {
        x;  // 0 | 1 | 2
    }
    x;  // 1 | 2
}
