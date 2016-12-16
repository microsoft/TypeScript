// @noImplicitReturns: true

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