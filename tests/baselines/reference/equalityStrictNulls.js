//// [tests/cases/conformance/types/typeRelationships/comparable/equalityStrictNulls.ts] ////

//// [equalityStrictNulls.ts]
function f1(x: string) {
    if (x == undefined) {
    }
    if (x != undefined) {
    }
    if (x === undefined) {
    }
    if (x !== undefined) {
    }
    if (x == null) {
    }
    if (x != null) {
    }
    if (x === null) {
    }
    if (x !== null) {
    }
    if (undefined == x) {
    }
    if (undefined != x) {
    }
    if (undefined === x) {
    }
    if (undefined !== x) {
    }
    if (null == x) {
    }
    if (null != x) {
    }
    if (null === x) {
    }
    if (null !== x) {
    }
}

function f2() {
    if (undefined == undefined) {
    }
    if (undefined == null) {
    }
    if (null == undefined) {
    }
    if (null == null) {
    }
}

function f3(a: number, b: boolean, c: { x: number }, d: number | string) {
    if (a == null) {
    }
    if (b == null) {
    }
    if (c == null) {
    }
    if (d == null) {
    }
}

function f4(x: number) {
    if (x > undefined) {
    }
    if (x < undefined) {
    }
    if (x >= undefined) {
    }
    if (x <= undefined) {
    }
}
function f5(x: string) {
    switch(x) {
        case null:
            break;
        case undefined:
            break;
        default:
            return;
    }
}


//// [equalityStrictNulls.js]
function f1(x) {
    if (x == undefined) {
    }
    if (x != undefined) {
    }
    if (x === undefined) {
    }
    if (x !== undefined) {
    }
    if (x == null) {
    }
    if (x != null) {
    }
    if (x === null) {
    }
    if (x !== null) {
    }
    if (undefined == x) {
    }
    if (undefined != x) {
    }
    if (undefined === x) {
    }
    if (undefined !== x) {
    }
    if (null == x) {
    }
    if (null != x) {
    }
    if (null === x) {
    }
    if (null !== x) {
    }
}
function f2() {
    if (undefined == undefined) {
    }
    if (undefined == null) {
    }
    if (null == undefined) {
    }
    if (null == null) {
    }
}
function f3(a, b, c, d) {
    if (a == null) {
    }
    if (b == null) {
    }
    if (c == null) {
    }
    if (d == null) {
    }
}
function f4(x) {
    if (x > undefined) {
    }
    if (x < undefined) {
    }
    if (x >= undefined) {
    }
    if (x <= undefined) {
    }
}
function f5(x) {
    switch (x) {
        case null:
            break;
        case undefined:
            break;
        default:
            return;
    }
}
