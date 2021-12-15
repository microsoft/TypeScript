//// [switchCaseTdz.ts]
switch (1 + 1) {
    case -1:
        x;
        y;
        z;

    case 0:
        var ok = 0;
        let x = 0;
        const y = 0;
        const [z] = [0];

        ok;
        x;
        y;
        z;

    case 1:
        x = 0; // <- bad
        y; // <- bad
        z; // <- bad
        ok;
        if (true) {
            x = 0; // <- bad
            y; // <- bad
            z; // <- bad
            ok;
        }
        let f1 = function () {
            x = 0; // <- bad
            y; // <- bad
            z; // <- bad
            ok;
        }
        break;

    case 2:
    case 3:
        x; // <- bad
        y; // <- bad
        z; // <- bad
        ok;
        if (true) {
            x; // <- bad
            y; // <- bad
            z; // <- bad
            ok;
        }
        let f2 = function () {
            x; // <- bad
            y; // <- bad
            z; // <- bad
            ok;
        }

}


//// [switchCaseTdz.js]
switch (1 + 1) {
    case -1:
        x_1;
        y_1;
        z_1;
    case 0:
        var ok = 0;
        var x_1 = 0;
        var y_1 = 0;
        var z_1 = [0][0];
        ok;
        x_1;
        y_1;
        z_1;
    case 1:
        x_1 = 0; // <- bad
        y_1; // <- bad
        z_1; // <- bad
        ok;
        if (true) {
            x_1 = 0; // <- bad
            y_1; // <- bad
            z_1; // <- bad
            ok;
        }
        var f1 = function () {
            x_1 = 0; // <- bad
            y_1; // <- bad
            z_1; // <- bad
            ok;
        };
        break;
    case 2:
    case 3:
        x_1; // <- bad
        y_1; // <- bad
        z_1; // <- bad
        ok;
        if (true) {
            x_1; // <- bad
            y_1; // <- bad
            z_1; // <- bad
            ok;
        }
        var f2 = function () {
            x_1; // <- bad
            y_1; // <- bad
            z_1; // <- bad
            ok;
        };
}
