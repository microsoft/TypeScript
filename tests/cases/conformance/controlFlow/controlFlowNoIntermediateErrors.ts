// @strict: true
// @noEmit: true

// Repros from #46475

function f1() {
    let code: 0 | 1 | 2 = 0;
    const otherCodes: (0 | 1 | 2)[] = [2, 0, 1, 0, 2, 2, 2, 0, 1, 0, 2, 1, 1, 0, 2, 1];
    for (const code2 of otherCodes) {
        if (code2 === 0) {        
            code = code === 2 ? 1 : 0;
        }
        else {
            code = 2;
        }
    }
}

function f2() {
    let code: 0 | 1 = 0;
    while (true) {
        code = code === 1 ? 0 : 1;
    }
}
