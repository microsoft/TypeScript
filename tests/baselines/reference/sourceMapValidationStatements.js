//// [tests/cases/compiler/sourceMapValidationStatements.ts] ////

//// [sourceMapValidationStatements.ts]
function f() {
    var y;
    var x = 0;
    for (var i = 0; i < 10; i++) {
        x += i;
        x *= 0;
    }
    if (x > 17) {
        x /= 9;
    } else {
        x += 10;
        x++;
    }
    var a = [
        1,
        2,
        3
    ];
    var obj = {
        z: 1,
        q: "hello"
    };
    for (var j in a) {
        obj.z = a[j];
        var v = 10;
    }
    try {
        obj.q = "ohhh";
    } catch (e) {
        if (obj.z < 10) {
            obj.z = 12;
        } else {
            obj.q = "hmm";
        }
    }
    try {
        throw new Error();
    } catch (e1) {
        var b = e1;
    } finally {
        y = 70;
    }
    with (obj) {
        i = 2;
        z = 10;
    }
    switch (obj.z) {
        case 0: {
            x++;
            break;

        }
        case 1: {
            x--;
            break;

        }
        default: {
            x *= 2;
            x = 50;
            break;

        }
    }
    while (x < 10) {
        x++;
    }
    do {
        x--;
    } while (x > 4)
    x = y;
    var z = (x == 1) ? x + 1 : x - 1;
    (x == 1) ? x + 1 : x - 1;
    x === 1;
    x = z = 40;
    eval("y");
    return;
}
var b = function () {
    var x = 10;
    x = x + 1;
};
f();

//// [sourceMapValidationStatements.js]
function f() {
    var y;
    var x = 0;
    for (var i = 0; i < 10; i++) {
        x += i;
        x *= 0;
    }
    if (x > 17) {
        x /= 9;
    }
    else {
        x += 10;
        x++;
    }
    var a = [
        1,
        2,
        3
    ];
    var obj = {
        z: 1,
        q: "hello"
    };
    for (var j in a) {
        obj.z = a[j];
        var v = 10;
    }
    try {
        obj.q = "ohhh";
    }
    catch (e) {
        if (obj.z < 10) {
            obj.z = 12;
        }
        else {
            obj.q = "hmm";
        }
    }
    try {
        throw new Error();
    }
    catch (e1) {
        var b = e1;
    }
    finally {
        y = 70;
    }
    with (obj) {
        i = 2;
        z = 10;
    }
    switch (obj.z) {
        case 0: {
            x++;
            break;
        }
        case 1: {
            x--;
            break;
        }
        default: {
            x *= 2;
            x = 50;
            break;
        }
    }
    while (x < 10) {
        x++;
    }
    do {
        x--;
    } while (x > 4);
    x = y;
    var z = (x == 1) ? x + 1 : x - 1;
    (x == 1) ? x + 1 : x - 1;
    x === 1;
    x = z = 40;
    eval("y");
    return;
}
var b = function () {
    var x = 10;
    x = x + 1;
};
f();
//# sourceMappingURL=sourceMapValidationStatements.js.map