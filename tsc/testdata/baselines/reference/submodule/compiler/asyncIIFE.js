//// [tests/cases/compiler/asyncIIFE.ts] ////

//// [asyncIIFE.ts]
function f1() {
    (async () => {
        await 10
        throw new Error();
    })();

    var x = 1;
}


//// [asyncIIFE.js]
function f1() {
    (async () => {
        await 10;
        throw new Error();
    })();
    var x = 1;
}
