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
