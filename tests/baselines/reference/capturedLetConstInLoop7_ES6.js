//// [capturedLetConstInLoop7_ES6.ts]
//===let
l0:
for (let x of []) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l0;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l0;
    }
}

l00:
for (let x in []) {
    (function() { return x});
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "1") {
        break l00;
    }
    if (x == "2") {
        continue;
    }
    if (x == "2") {
        continue l00;
    }
}

l1:
for (let x = 0; x < 1; ++x) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l1;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l1;
    }
}

l2:
while (1 === 1) {
    let x;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l2;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l2;
    }
}

l3:
do {
    let x;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l3;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l3;
    }
} while (1 === 1)

l4:
for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l4;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l4;
    }
}

l5:
for (let x = 0, y = 1; x < 1; ++x) {
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l5;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l5;
    }
}

l6:
while (1 === 1) {
    let x, y;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l6;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l6;
    }

}

l7:
do {
    let x, y;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l7;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l7;
    }
} while (1 === 1)

l8:
for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l8;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l8;
    }
}

//===const
l0_c:
for (const x of []) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l0_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l0_c;
    }
}

l00_c:
for (const x in []) {
    (function() { return x});
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "1") {
        break l00_c;
    }
    if (x == "2") {
        continue;
    }
    if (x == "2") {
        continue l00_c;
    }
}

l1_c:
for (const x = 0; x < 1;) {
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l1_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l1_c;
    }
}

l2_c:
while (1 === 1) {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l2_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l2_c;
    }
}

l3_c:
do {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l3_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l3_c;
    }
} while (1 === 1)

l4_c:
for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x});
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l4_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l4_c;
    }
}

l5_c:
for (const x = 0, y = 1; x < 1;) {
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l5_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l5_c;
    }
}

l6_c:
while (1 === 1) {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l6_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l6_c;
    }

}

l7_c:
do {
    const x = 1, y = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l7_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l7_c;
    }
} while (1 === 1)

l8_c:
for (const y = 0; y < 1;) {
    const x = 1;
    (function() { return x + y});
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l8_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l8_c;
    }
}

//// [capturedLetConstInLoop7_ES6.js]
//===let
l0: for (let x of []) {
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l0;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l0;
    }
}
l00: for (let x in []) {
    (function () { return x; });
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "1") {
        break l00;
    }
    if (x == "2") {
        continue;
    }
    if (x == "2") {
        continue l00;
    }
}
l1: for (let x = 0; x < 1; ++x) {
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l1;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l1;
    }
}
l2: while (1 === 1) {
    let x;
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l2;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l2;
    }
}
l3: do {
    let x;
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l3;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l3;
    }
} while (1 === 1);
l4: for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l4;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l4;
    }
}
l5: for (let x = 0, y = 1; x < 1; ++x) {
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l5;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l5;
    }
}
l6: while (1 === 1) {
    let x, y;
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l6;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l6;
    }
}
l7: do {
    let x, y;
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l7;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l7;
    }
} while (1 === 1);
l8: for (let y = 0; y < 1; ++y) {
    let x = 1;
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l8;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l8;
    }
}
//===const
l0_c: for (const x of []) {
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l0_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l0_c;
    }
}
l00_c: for (const x in []) {
    (function () { return x; });
    (() => x);
    if (x == "1") {
        break;
    }
    if (x == "1") {
        break l00_c;
    }
    if (x == "2") {
        continue;
    }
    if (x == "2") {
        continue l00_c;
    }
}
l1_c: for (const x = 0; x < 1;) {
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l1_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l1_c;
    }
}
l2_c: while (1 === 1) {
    const x = 1;
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l2_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l2_c;
    }
}
l3_c: do {
    const x = 1;
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l3_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l3_c;
    }
} while (1 === 1);
l4_c: for (const y = 0; y < 1;) {
    const x = 1;
    (function () { return x; });
    (() => x);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l4_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l4_c;
    }
}
l5_c: for (const x = 0, y = 1; x < 1;) {
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l5_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l5_c;
    }
}
l6_c: while (1 === 1) {
    const x = 1, y = 1;
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l6_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l6_c;
    }
}
l7_c: do {
    const x = 1, y = 1;
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l7_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l7_c;
    }
} while (1 === 1);
l8_c: for (const y = 0; y < 1;) {
    const x = 1;
    (function () { return x + y; });
    (() => x + y);
    if (x == 1) {
        break;
    }
    if (x == 1) {
        break l8_c;
    }
    if (x == 2) {
        continue;
    }
    if (x == 2) {
        continue l8_c;
    }
}
