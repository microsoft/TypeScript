//// [tests/cases/compiler/capturedLetConstInLoop11.ts] ////

//// [capturedLetConstInLoop11.ts]
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

//// [capturedLetConstInLoop11.js]
for (;;) {
    let x = 1;
    () => x;
}
function foo() {
    for (;;) {
        const a = 0;
        switch (a) {
            case 0: return () => a;
        }
    }
}
