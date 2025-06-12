//// [tests/cases/compiler/blockScopedBindingsReassignedInLoop6.ts] ////

//// [blockScopedBindingsReassignedInLoop6.ts]
function f1() {
    for (let [x, y] = [1, 2]; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1)
            break;
        else if (y == 2)
            y = 5;
        else
            return;
    }
}

function f2() {
    for (let [{a: x, b: {c: y}}] = [{a: 1, b: {c: 2}}]; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1)
            break;
        else if (y == 2)
            y = 5;
        else
            return;
    }
}







//// [blockScopedBindingsReassignedInLoop6.js]
function f1() {
    for (let [x, y] = [1, 2]; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1)
            break;
        else if (y == 2)
            y = 5;
        else
            return;
    }
}
function f2() {
    for (let [{ a: x, b: { c: y } }] = [{ a: 1, b: { c: 2 } }]; x < y; ++x, --y) {
        let a = () => x++ + y++;
        if (x == 1)
            break;
        else if (y == 2)
            y = 5;
        else
            return;
    }
}
