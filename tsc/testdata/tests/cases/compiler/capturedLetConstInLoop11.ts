// @target: es2015
// @strict: false
for (;;) {
    let x = 1;
    () => x;
}

function foo() {
    for (;;) {
        const a = 0;
        switch(a) {
            case 0: return () => a;
        }
    }
}