//// [tests/cases/compiler/ambientWithStatements.ts] ////

//// [ambientWithStatements.ts]
declare module M {
    break;
    continue;
    debugger;
    do { } while (true);
    var x;
    for (x in null) { }
    if (true) { } else { }
    1;
    L: var y;
    return;
    switch (x) {
        case 1:
            break;
        default:
            break;
    }
    throw "nooo";
    try {
    }
    catch (e) {
    }
    finally {
    }
    with (x) {
    }
}

//// [ambientWithStatements.js]
