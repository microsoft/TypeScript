//// [tests/cases/compiler/declFileTypeofInAnonymousType.ts] ////

//// [declFileTypeofInAnonymousType.ts]
module m1 {
    export class c {
    }
    export enum e {
        weekday,
        weekend,
        holiday
    }
}
var a: { c: m1.c; };
var b = {
    c: m1.c,
    m1: m1
};
var c = { m1: m1 };
var d = {
    m: { mod: m1 },
    mc: { cl: m1.c },
    me: { en: m1.e },
    mh: m1.e.holiday
};

//// [declFileTypeofInAnonymousType.js]
var m1;
(function (m1) {
    class c {
    }
    m1.c = c;
    let e;
    (function (e) {
        e[e["weekday"] = 0] = "weekday";
        e[e["weekend"] = 1] = "weekend";
        e[e["holiday"] = 2] = "holiday";
    })(e = m1.e || (m1.e = {}));
})(m1 || (m1 = {}));
var a;
var b = {
    c: m1.c,
    m1: m1
};
var c = { m1: m1 };
var d = {
    m: { mod: m1 },
    mc: { cl: m1.c },
    me: { en: m1.e },
    mh: m1.e.holiday
};
