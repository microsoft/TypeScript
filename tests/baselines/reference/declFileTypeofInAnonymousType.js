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
    var c = (function () {
        function c() {
        }
        return c;
    })();
    m1.c = c;
    (function (e) {
        e[e["weekday"] = 0] = "weekday";
        e[e["weekend"] = 1] = "weekend";
        e[e["holiday"] = 2] = "holiday";
    })(m1.e || (m1.e = {}));
    var e = m1.e;
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
    mh: 2 /* holiday */
};


//// [declFileTypeofInAnonymousType.d.ts]
