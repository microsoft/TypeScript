//// [tests/cases/conformance/salsa/plainJSBinderErrors.ts] ////

//// [plainJSBinderErrors.js]
export default 12
export default 13
const await = 1
const yield = 2
async function f() {
    const await = 3
}
function* g() {
    const yield = 4
}
class C {
    #constructor = 5
    deleted() {
        function container(f) {
            delete f
        }
        var g = 6
        delete g
        delete container
    }
    evalArguments() {
        const eval = 7
        const arguments = 8
    }
    withOctal() {
        const redundant = 0o10
        with (redundant) {
            return toFixed()
        }
    }
    label() {
        for(;;) {
            label: var x = 1
            break label
        }
        return x
    }
}
const eval = 9
const arguments = 10


//// [plainJSBinderErrors.js]
export default 12;
export default 13;
const await = 1;
const yield = 2;
async function f() {
    const await = 3;
}
function* g() {
    const yield = 4;
}
class C {
    #constructor = 5;
    deleted() {
        function container(f) {
            delete f;
        }
        var g = 6;
        delete g;
        delete container;
    }
    evalArguments() {
        const eval = 7;
        const arguments = 8;
    }
    withOctal() {
        const redundant = 0o10;
        with (redundant) {
            return toFixed();
        }
    }
    label() {
        for (;;) {
            label: var x = 1;
            break label;
        }
        return x;
    }
}
const eval = 9;
const arguments = 10;
