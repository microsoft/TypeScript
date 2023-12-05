//// [tests/cases/compiler/capturedLetConstInLoop11_ES6.ts] ////

//// [capturedLetConstInLoop11_ES6.ts]
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

//// [capturedLetConstInLoop11_ES6.js]
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
