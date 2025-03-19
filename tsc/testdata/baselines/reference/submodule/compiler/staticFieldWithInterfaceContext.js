//// [tests/cases/compiler/staticFieldWithInterfaceContext.ts] ////

//// [staticFieldWithInterfaceContext.ts]
interface I {
    x: { a: "a" };
}
let c: I = class {
    // should typecheck the same as the last line
    static x = { a: "a" };
};
c.x = { a: "a" };

const ex = "x";
let c2: I = class { static [ex] = { a: "a" }; };
c[ex] = { a: "a" };

function f(c: I = class { static x = { a: "a" } }) { }

let { c: c3 }: { c: I } = { c: class { static x = { a: "a" } } };
let { c: c4 = class { static x = { a: "a" } }}: { c?: I } = { };
let { c: c5 = class { static x = { a: "a" } }}: { c?: I } = { c: class { static x = { a: "a" } } };
let [ c6 ]: [I] = [class { static x = { a: "a" } }];
let [ c7 ]: I[] = [class { static x = { a: "a" } }];

let [ c8 = class { static x = { a: "a" } } ]: [I?] = [];
let [ c9 = class { static x = { a: "a" } } ]: I[] = [];
let [ c10 = class { static x = { a: "a" } } ]: [I?] = [class { static x = { a: "a" } }];
let [ c11 = class { static x = { a: "a" } } ]: I[] = [class { static x = { a: "a" } }];


//// [staticFieldWithInterfaceContext.js]
let c = class {
    // should typecheck the same as the last line
    static x = { a: "a" };
};
c.x = { a: "a" };
const ex = "x";
let c2 = class {
    static [ex] = { a: "a" };
};
c[ex] = { a: "a" };
function f(c = class {
    static x = { a: "a" };
}) { }
let { c: c3 } = { c: class {
        static x = { a: "a" };
    } };
let { c: c4 = class {
    static x = { a: "a" };
} } = {};
let { c: c5 = class {
    static x = { a: "a" };
} } = { c: class {
        static x = { a: "a" };
    } };
let [c6] = [class {
        static x = { a: "a" };
    }];
let [c7] = [class {
        static x = { a: "a" };
    }];
let [c8 = class {
    static x = { a: "a" };
}] = [];
let [c9 = class {
    static x = { a: "a" };
}] = [];
let [c10 = class {
    static x = { a: "a" };
}] = [class {
        static x = { a: "a" };
    }];
let [c11 = class {
    static x = { a: "a" };
}] = [class {
        static x = { a: "a" };
    }];
