//// [differenceGeneric.ts]
interface Gen {
    x: number;
}
interface Gen2 {
    parent: Gen;
    millenial: string;
}
function cloneAgain<T extends Gen & Gen2>(t: T): T - (x) {
    // declarations with generics create difference types
    let rest: T - (x);
    let rest1: T - (x) - (parent, millenial);
    var { x, parent, ...rest2 } = t;
    // apparent types distribute the intersection constraint correctly
    rest.parent;
    rest.millenial;
    rest2.millenial;
    ({ x, parent, ...rest2 } = t);
    return rest2; // TODO: T - (x, parent) shouldn't be assignable to T - (x)
}
interface Gen3 extends Gen2 {
    x: number;
    w: boolean;
}
let gen3: Gen3;
let rested = cloneAgain(gen3);
rested.parent;
rested.millenial;
rested.w;


//// [differenceGeneric.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
function cloneAgain(t) {
    // declarations with generics create difference types
    var rest;
    var rest1;
    var x = t.x, parent = t.parent, rest2 = __rest(t, ["x", "parent"]);
    // apparent types distribute the intersection constraint correctly
    rest.parent;
    rest.millenial;
    rest2.millenial;
    (x = t.x, parent = t.parent, t, rest2 = __rest(t, ["x", "parent"]), t);
    return rest2; // TODO: T - (x, parent) shouldn't be assignable to T - (x)
}
var gen3;
var rested = cloneAgain(gen3);
rested.parent;
rested.millenial;
rested.w;


//// [differenceGeneric.d.ts]
interface Gen {
    x: number;
}
interface Gen2 {
    parent: Gen;
    millenial: string;
}
declare function cloneAgain<T extends Gen & Gen2>(t: T): T - (x);
interface Gen3 extends Gen2 {
    x: number;
    w: boolean;
}
declare let gen3: Gen3;
declare let rested: {
    w: boolean;
    parent: Gen;
    millenial: string;
};
