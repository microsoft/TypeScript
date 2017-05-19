function foo() {
    l0:
    for (let z = 0; z < 1; ++z) {
        l1:
        for (let x = 0; x < 1; ++x) {
            ll1:
            for (let y = 0; y < 1; ++y) {
                (function() { return x + y });
                (() => x + y);
                if (y == 1) {
                    break;
                }
                if (y == 1) {
                    break l1;
                }
                if (y == 1) {
                    break ll1;
                }
                if (y == 1) {
                    continue l0;
                }

                if (x == 2) {
                    continue;
                }
                if (x == 2) {
                    continue l1;
                }
                if (x == 2) {
                    continue ll1;
                }
                if (x == 2) {
                    return "123"
                }
                if (x == 3) {
                    return;
                }
            }
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
            if (x == 2) {
                continue l0;
            }
            if (x == 2) {
                return "456";
            }
            if (x == 3) {
                return;
            }
        }
    }
}

function foo_c() {
    l0:
    for (const z = 0; z < 1;) {
        l1:
        for (const x = 0; x < 1;) {
            ll1:
            for (const y = 0; y < 1;) {
                (function() { return x + y });
                (() => x + y);
                if (y == 1) {
                    break;
                }
                if (y == 1) {
                    break l1;
                }
                if (y == 1) {
                    break ll1;
                }
                if (y == 1) {
                    continue l0;
                }

                if (x == 2) {
                    continue;
                }
                if (x == 2) {
                    continue l1;
                }
                if (x == 2) {
                    continue ll1;
                }
                if (x == 2) {
                    return "123"
                }
                if (x == 3) {
                    return;
                }
            }
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
            if (x == 2) {
                continue l0;
            }
            if (x == 2) {
                return "456";
            }
            if (x == 3) {
                return;
            }
        }
    }
}
