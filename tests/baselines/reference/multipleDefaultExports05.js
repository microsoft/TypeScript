//// [tests/cases/conformance/es6/modules/multipleDefaultExports05.ts] ////

//// [m1.ts]

export default function () {

}

export default function () {

}

//// [m2.ts]
export default function () {

}

export default class {

}

//// [m3.ts]
export default function () {

}

export default class C {

}

//// [m4.ts]
export default function f() {

}

export default class {

}

//// [m1.js]
function default_1() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_2() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_2;
//// [m2.js]
function default_1() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_2;
//// [m3.js]
function default_1() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var C = (function () {
    function C() {
    }
    return C;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = C;
//// [m4.js]
function f() {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
