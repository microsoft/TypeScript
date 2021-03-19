//// [classStaticBlock8.ts]
function foo (v: number) {
    label: if (v) {
        class C {
            static {
                if (v === 1) {
                    break label;
                }
                if (v === 2) {
                    continue label;
                }
                if (v === 3) {
                    break
                }
                if (v === 4) {
                    continue
                }

            }
        }

        if (v === 5) {
            break label;
        }
        if (v === 6) {
            continue label;
        }
        if (v === 7) {
            break;
        }
        if (v === 8) {
            continue;
        }
    }
}


//// [classStaticBlock8.js]
function foo(v) {
    label: if (v) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        if (v === 5) {
            break label;
        }
        if (v === 6) {
            continue label;
        }
        if (v === 7) {
            break;
        }
        if (v === 8) {
            continue;
        }
    }
}
