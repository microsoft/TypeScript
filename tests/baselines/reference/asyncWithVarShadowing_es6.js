//// [asyncWithVarShadowing_es6.ts]
// https://github.com/Microsoft/TypeScript/issues/20461
declare const y: any;

async function fn1(x) {
    var x;
}

async function fn2(x) {
    var x, z;
}

async function fn3(x) {
    var z;
}

async function fn4(x) {
    var x = y;
}

async function fn5(x) {
    var { x } = y;
}

async function fn6(x) {
    var { x, z } = y;
}

async function fn7(x) {
    var { x = y } = y;
}

async function fn8(x) {
    var { z: x } = y;
}

async function fn9(x) {
    var { z: { x } } = y;
}

async function fn10(x) {
    var { z: { x } = y } = y;
}

async function fn11(x) {
    var { ...x } = y;
}

async function fn12(x) {
    var [x] = y;
}

async function fn13(x) {
    var [x = y] = y;
}

async function fn14(x) {
    var [, x] = y;
}

async function fn15(x) {
    var [...x] = y;
}

async function fn16(x) {
    var [[x]] = y;
}

async function fn17(x) {
    var [[x] = y] = y;
}

async function fn18({ x }) {
    var x;
}

async function fn19([x]) {
    var x;
}

async function fn20(x) {
    {
        var x;
    }
}

async function fn21(x) {
    if (y) {
        var x;
    }
}

async function fn22(x) {
    if (y) {
    }
    else {
        var x;
    }
}

async function fn23(x) {
    try {
        var x;
    }
    catch (e) {
    }
}

async function fn24(x) {
    try {

    }
    catch (e) {
        var x;
    }
}

async function fn25(x) {
    try {

    }
    catch (x) {
        var x;
    }
}

async function fn26(x) {
    try {

    }
    catch ({ x }) {
        var x;
    }
}

async function fn27(x) {
    try {
    }
    finally {
        var x;
    }
}

async function fn28(x) {
    while (y) {
        var x;
    }
}

async function fn29(x) {
    do {
        var x;
    }
    while (y);
}

async function fn30(x) {
    for (var x = y;;) {

    }
}

async function fn31(x) {
    for (var { x } = y;;) {
    }
}

async function fn32(x) {
    for (;;) {
        var x;
    }
}

async function fn33(x: string) {
    for (var x in y) {
    }
}

async function fn34(x) {
    for (var z in y) {
        var x;
    }
}

async function fn35(x) {
    for (var x of y) {
    }
}

async function fn36(x) {
    for (var { x } of y) {
    }
}

async function fn37(x) {
    for (var z of y) {
        var x;
    }
}

async function fn38(x) {
    switch (y) {
        case y:
            var x;
    }
}

async function fn39(x) {
    foo: {
        var x;
        break foo;
    }
}

async function fn40(x) {
    try {

    }
    catch {
        var x;
    }
}


//// [asyncWithVarShadowing_es6.js]
function fn1(x) {
    return __awaiter(this, void 0, void 0, function* () {
    });
    var x;
}
function fn2(x) {
    return __awaiter(this, void 0, void 0, function* () {
    });
    var x, z;
}
function fn3(x) {
    return __awaiter(this, void 0, void 0, function* () {
        var z;
    });
}
function fn4(x) {
    return __awaiter(this, void 0, void 0, function* () {
        x = y;
    });
    var x;
}
function fn5(x) {
    return __awaiter(this, void 0, void 0, function* () {
        ({ x } = y);
    });
    var x;
}
function fn6(x) {
    return __awaiter(this, void 0, void 0, function* () {
        ({ x, z } = y);
    });
    var x, z;
}
function fn7(x) {
    return __awaiter(this, void 0, void 0, function* () {
        ({ x = y } = y);
    });
    var x;
}
function fn8(x) {
    return __awaiter(this, void 0, void 0, function* () {
        ({ z: x } = y);
    });
    var x;
}
function fn9(x) {
    return __awaiter(this, void 0, void 0, function* () {
        ({ z: { x } } = y);
    });
    var x;
}
function fn10(x) {
    return __awaiter(this, void 0, void 0, function* () {
        ({ z: { x } = y } = y);
    });
    var x;
}
function fn11(x) {
    return __awaiter(this, void 0, void 0, function* () {
        x = __rest(y, []);
    });
    var x;
}
function fn12(x) {
    return __awaiter(this, void 0, void 0, function* () {
        [x] = y;
    });
    var x;
}
function fn13(x) {
    return __awaiter(this, void 0, void 0, function* () {
        [x = y] = y;
    });
    var x;
}
function fn14(x) {
    return __awaiter(this, void 0, void 0, function* () {
        [, x] = y;
    });
    var x;
}
function fn15(x) {
    return __awaiter(this, void 0, void 0, function* () {
        [...x] = y;
    });
    var x;
}
function fn16(x) {
    return __awaiter(this, void 0, void 0, function* () {
        [[x]] = y;
    });
    var x;
}
function fn17(x) {
    return __awaiter(this, void 0, void 0, function* () {
        [[x] = y] = y;
    });
    var x;
}
function fn18({ x }) {
    return __awaiter(this, void 0, void 0, function* () {
    });
    var x;
}
function fn19([x]) {
    return __awaiter(this, void 0, void 0, function* () {
    });
    var x;
}
function fn20(x) {
    return __awaiter(this, void 0, void 0, function* () {
        {
        }
    });
    var x;
}
function fn21(x) {
    return __awaiter(this, void 0, void 0, function* () {
        if (y) {
        }
    });
    var x;
}
function fn22(x) {
    return __awaiter(this, void 0, void 0, function* () {
        if (y) {
        }
        else {
        }
    });
    var x;
}
function fn23(x) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (e) {
        }
    });
    var x;
}
function fn24(x) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (e) {
        }
    });
    var x;
}
function fn25(x) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (x) {
            var x;
        }
    });
}
function fn26(x) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch ({ x }) {
            var x;
        }
    });
}
function fn27(x) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        finally {
        }
    });
    var x;
}
function fn28(x) {
    return __awaiter(this, void 0, void 0, function* () {
        while (y) {
        }
    });
    var x;
}
function fn29(x) {
    return __awaiter(this, void 0, void 0, function* () {
        do {
        } while (y);
    });
    var x;
}
function fn30(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (x = y;;) {
        }
    });
    var x;
}
function fn31(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for ({ x } = y;;) {
        }
    });
    var x;
}
function fn32(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (;;) {
        }
    });
    var x;
}
function fn33(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (x in y) {
        }
    });
    var x;
}
function fn34(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var z in y) {
        }
    });
    var x;
}
function fn35(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (x of y) {
        }
    });
    var x;
}
function fn36(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for ({ x } of y) {
        }
    });
    var x;
}
function fn37(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var z of y) {
        }
    });
    var x;
}
function fn38(x) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (y) {
            case y:
        }
    });
    var x;
}
function fn39(x) {
    return __awaiter(this, void 0, void 0, function* () {
        foo: {
            break foo;
        }
    });
    var x;
}
function fn40(x) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (_a) {
        }
    });
    var x;
}
