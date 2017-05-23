//// [unreachableFlowAfterFinally.ts]
function f() {
    let x = 100;
    try {
        throw "WAT"
    }
    catch (e) {

    }
    finally {
        return x;
    }
}

//// [unreachableFlowAfterFinally.js]
function f() {
    var x = 100;
    try {
        throw "WAT";
    }
    catch (e) {
    }
    finally {
        return x;
    }
}
