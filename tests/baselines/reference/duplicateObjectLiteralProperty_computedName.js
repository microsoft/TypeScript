//// [duplicateObjectLiteralProperty_computedName.ts]
const t1 = {
    1: 1,
    [1]: 0 // duplicate
}

const t2 = {
    1: 1,
    [+1]: 0 // duplicate
}

const t3 = {
    "1": 1,
    [+1]: 0 // duplicate
}

const t4 = {
    "+1": 1,
    [+1]: 0 // two different keys, "+1", "1"
}

const t5 = {
    "+1": 1,
    ["+1"]: 0 // duplicate
}

const t6 = {
    "-1": 1,
    [-1]: 0 // duplicate
}

const t7 = {
    "-1": 1,
    ["-1"]: 0 // duplicate
}


//// [duplicateObjectLiteralProperty_computedName.js]
var _a, _b, _c, _d, _e, _f, _g;
var t1 = (_a = {
        1: 1
    },
    _a[1] = 0 // duplicate
,
    _a);
var t2 = (_b = {
        1: 1
    },
    _b[+1] = 0 // duplicate
,
    _b);
var t3 = (_c = {
        "1": 1
    },
    _c[+1] = 0 // duplicate
,
    _c);
var t4 = (_d = {
        "+1": 1
    },
    _d[+1] = 0 // two different keys, "+1", "1"
,
    _d);
var t5 = (_e = {
        "+1": 1
    },
    _e["+1"] = 0 // duplicate
,
    _e);
var t6 = (_f = {
        "-1": 1
    },
    _f[-1] = 0 // duplicate
,
    _f);
var t7 = (_g = {
        "-1": 1
    },
    _g["-1"] = 0 // duplicate
,
    _g);
