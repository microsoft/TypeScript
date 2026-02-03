//// [tests/cases/compiler/controlFlowWithIncompleteTypes.ts] ////

//// [controlFlowWithIncompleteTypes.ts]
// Repro from #11000

declare var cond: boolean;

function foo1() {
    let x: string | number | boolean = 0;
    while (cond) {
        if (typeof x === "string") {
            x = x.slice();
        }
        else {
            x = "abc";
        }
    }
}

function foo2() {
    let x: string | number | boolean = 0;
    while (cond) {
        if (typeof x === "number") {
            x = "abc";
        }
        else {
            x = x.slice();
        }
    }
}

//// [controlFlowWithIncompleteTypes.js]
// Repro from #11000
function foo1() {
    var x = 0;
    while (cond) {
        if (typeof x === "string") {
            x = x.slice();
        }
        else {
            x = "abc";
        }
    }
}
function foo2() {
    var x = 0;
    while (cond) {
        if (typeof x === "number") {
            x = "abc";
        }
        else {
            x = x.slice();
        }
    }
}
