//// [doExpressionContinue.ts]
for (const i of [1]) {
    (do {
        if (i === 1) continue;
        1;
    })
}


for (const i of [1]) {
    for (const i of [1]) {
        (do {
            if (i === 1) continue;
            1;
        })
    }
}

a: for (const i of [1]) {
    for (const i of [1]) {
        (do {
            if (i === 1) continue a;
            1;
        })
    }
}


//// [doExpressionContinue.js]
var _a, _b, _c;
for (const i of [1]) {
    var _d = {};
    try {
        ((() => {
            if (i === 1)
                throw _d;
            _a = 1;
        })(), _a);
    }
    catch (_e) {
        if (_e == _d)
            continue;
        throw _e;
    }
}
for (const i of [1]) {
    for (const i of [1]) {
        var _f = {};
        try {
            ((() => {
                if (i === 1)
                    throw _f;
                _b = 1;
            })(), _b);
        }
        catch (_g) {
            if (_g == _f)
                continue;
            throw _g;
        }
    }
}
a: for (const i of [1]) {
    var _h = {};
    try {
        for (const i of [1]) {
            ((() => {
                if (i === 1)
                    throw _h;
                _c = 1;
            })(), _c);
        }
    }
    catch (_j) {
        if (_j == _h)
            continue;
        throw _j;
    }
}
