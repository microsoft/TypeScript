//// [tests/cases/compiler/cf.ts] ////

//// [cf.ts]
function f() {
    var z;
    var x=10;
    var y=3;

    L1: for (var i=0;i<19;i++) {
        if (y==7) {
            continue L1;
            x=11;
        }
        if (y==3) {
            y++;
        }
        else {
            y--;
        }
        do {
            y+=2;
            if (y==20) {
                break;
                x=12;
            }
        } while (y<41);
        y++;
    }
    while (y>2) {
        y=y>>1;
    }
    L2: try {
        L3: if (x<y) {
            break L2;
            x=13;
        }
        else {
            break L3;
            x=14;
        }
    }
    catch (e) {
        x++;
    }
    finally {
        x+=3;
    }
    y++;
    for (var k=0;k<10;k++) {
        z;
        break;
    }
    for (k=0;k<10;k++) {
        if (k==6) {
            continue;
        }
        break;
    }
}


//// [cf.js]
function f() {
    var z;
    var x = 10;
    var y = 3;
    L1: for (var i = 0; i < 19; i++) {
        if (y == 7) {
            continue L1;
            x = 11;
        }
        if (y == 3) {
            y++;
        }
        else {
            y--;
        }
        do {
            y += 2;
            if (y == 20) {
                break;
                x = 12;
            }
        } while (y < 41);
        y++;
    }
    while (y > 2) {
        y = y >> 1;
    }
    L2: try {
        L3: if (x < y) {
            break L2;
            x = 13;
        }
        else {
            break L3;
            x = 14;
        }
    }
    catch (e) {
        x++;
    }
    finally {
        x += 3;
    }
    y++;
    for (var k = 0; k < 10; k++) {
        z;
        break;
    }
    for (k = 0; k < 10; k++) {
        if (k == 6) {
            continue;
        }
        break;
    }
}
